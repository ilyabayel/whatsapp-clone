import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {reducers} from "./reducers";
import {UserState} from "./modules/user/user.types";
import {RoomsState} from "./modules/rooms/rooms.types";
import {MessagesState} from "./modules/messages/messages.types";
import {AuthState} from "./modules/auth/auth.types";

export type Store = {
  user: UserState;
  rooms: RoomsState;
  messages: MessagesState;
  auth: AuthState;
};

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
