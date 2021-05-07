import {combineReducers} from "redux";
import {userReducer} from "./modules/user/user.reducer";
import {roomsReducer} from "./modules/rooms/rooms.reducer";
import {messagesReducer} from "./modules/messages/messages.reducer";
import {authSlice} from "./modules/auth/auth.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  rooms: roomsReducer,
  messages: messagesReducer,
  auth: authSlice.reducer
});
