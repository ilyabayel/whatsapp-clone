import {userActions} from "./modules/user/user.actions";
import {roomsActions} from "./modules/rooms/rooms.actions";
import {messagesSlice} from "./modules/messages/messages.slice";
import {authSlice} from "./modules/auth/auth.slice";

export const actions = {
  user: userActions,
  rooms: roomsActions,
  messages: messagesSlice.actions,
  auth: authSlice.actions
};
