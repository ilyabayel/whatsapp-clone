import {userSlice} from "./modules/user/user.slice";
import {roomsSlice} from "./modules/rooms/rooms.slice";
import {messagesSlice} from "./modules/messages/messages.slice";
import {authSlice} from "./modules/auth/auth.slice";

export const actions = {
  user: userSlice.actions,
  rooms: roomsSlice.actions,
  messages: messagesSlice.actions,
  auth: authSlice.actions
};
