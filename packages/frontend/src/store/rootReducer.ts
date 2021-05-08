import {combineReducers} from "redux";
import {userReducer} from "./modules/user/user.reducer";
import {roomsReducer} from "./modules/rooms/rooms.reducer";
import {messagesSlice} from "./modules/messages/messages.slice";
import {authSlice} from "./modules/auth/auth.slice";

export const rootReducer = combineReducers({
  user: userReducer,
  rooms: roomsReducer,
  messages: messagesSlice.reducer,
  auth: authSlice.reducer
});
