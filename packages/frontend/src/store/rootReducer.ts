import {combineReducers} from "redux";
import {userSlice} from "./modules/user/user.slice";
import {roomsSlice} from "./modules/rooms/rooms.slice";
import {messagesSlice} from "./modules/messages/messages.slice";
import {authSlice} from "./modules/auth/auth.slice";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  rooms: roomsSlice.reducer,
  messages: messagesSlice.reducer,
  auth: authSlice.reducer
});
