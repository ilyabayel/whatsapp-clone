import React, {ReactElement, useState} from "react";
import {Redirect, Link} from "react-router-dom";
import hash from "object-hash";
import {UAParser} from "ua-parser-js";

import {authService} from "../../api/auth/auth-service";
import "./login.scss";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "../../store/store";
import {actions} from "../../store/actions";
import {setItemsToLocalStorage} from "../../utils/local-storage.utils";
import {usersService} from "../../api/users/users-service";

const uaParser = new UAParser();

export function Login(): ReactElement {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const accessToken = useSelector((state: Store) => state.auth.accessToken);

  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Данные не были введены");
    const authRes = await authService.login({email, password, uaHash: hash(uaParser.getUA())});
    const {accessToken, refreshToken, expiresIn, userId} = authRes.data;
    setItemsToLocalStorage({accessToken, refreshToken, expiresIn, userId});
    dispatch(actions.auth.setAuth({accessToken, refreshToken, expiresIn}));
    const userRes = await usersService.getInfo(userId);
    dispatch(actions.user.setUser(userRes.data));
  };

  if (!accessToken) {
    return (
      <div className="login-page">
        <div className="landing-wrapper">
          <div className="landing-wrapper__form-wrapper">
            <form onSubmit={login} className="login-form">
              <h2 className="login-form__heading">Login</h2>
              <label className="login-form__label">Email</label>
              <input
                id="email"
                className="login-form__form-control"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <label className="login-form__label"> Password</label>
              <input
                id="password"
                type="password"
                className="login-form__form-control"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="login-form__btn">
                <span>Log in</span>
              </button>
              <Link to="/register">
                <span className="login-form__register">Register</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect exact to="/" />;
  }
}
