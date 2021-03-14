import React, {ReactElement, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {createPreloader} from "./utils/optimization.utils";

import {messagesService} from "./api/messages/messages";
import {usersService} from "./api/users/users-service";
import {apiService} from "./api/api-service";
import {centrifuge} from "./api/centrifuge";

import {actions} from "./store/actions";
import {Store} from "./store/store";

import {ChatContainer} from "./containers/chat-container/chat-container";
import {Sidebar} from "components/sidebar/sidebar";

import "./app.scss";
import {authService} from "./api/auth/auth-service";
import {uaHash} from "./utils/ua-helper";
import {setItemsToLocalStorage} from "./utils/local-storage.utils";

const preloader = createPreloader();

preloader.preload("images/chat-bg-light.png");

export function App(): ReactElement {
  const dispatch = useDispatch();

  const rooms = useSelector((state: Store) => state.rooms.rooms);
  const accessToken = useSelector((state: Store) => state.auth.accessToken);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      dispatch(actions.rooms.setSelectedRoom({id: "-1", participants: []}));
    }
  };

  const logout = (e?) => {
    e?.preventDefault();
    localStorage.clear();
    dispatch(actions.auth.setTokens({accessToken: null}));
  };

  useEffect(() => {
    if (!accessToken) return;

    apiService.setBearer(accessToken);

    apiService.instance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response.status === 401) {
          authService
            .refresh({
              refreshToken: localStorage.getItem("refreshToken"),
              uaHash: uaHash,
              userId: localStorage.getItem("userId")
            })
            .then((res) => {
              const {accessToken, refreshToken} = res.data;
              apiService.setBearer(accessToken);
              setItemsToLocalStorage({...res.data});
              dispatch(actions.auth.setTokens({accessToken, refreshToken}));
            })
            .catch(() => {
              logout();
            });
        }
      }
    );

    messagesService
      .getAll()
      .then((messages) => {
        dispatch(actions.messages.setMessages(messages));
      })
      .catch((err) => console.log(err));

    usersService.getInfo(localStorage.getItem("userId")).then((res) => {
      const user = res.data;
      console.log(user);
      dispatch(
        actions.user.setUser({
          ...user,
          lastLogin: moment().format("LTS")
        })
      );
    });

    apiService.instance
      .get<string>("/wstoken", {params: {channel: "public"}})
      .then((res) => {
        centrifuge.setToken(res.data);
        centrifuge.connect();
        for (const room of rooms) {
          centrifuge.subscribe("public:" + room.id, (res) => {
            dispatch(actions.messages.addMessage(res.data));
          });
        }
      });

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [accessToken]);

  if (!accessToken) {
    return <Redirect to="/login" push exact />;
  }

  return (
    <div className="app">
      <button className="logout-btn" onClick={logout}>
        Log out
      </button>
      <div className="app__body">
        <Sidebar />
        <ChatContainer />
      </div>
    </div>
  );
}
