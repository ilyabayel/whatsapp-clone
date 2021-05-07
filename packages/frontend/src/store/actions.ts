import {userActions} from "./modules/user/user.actions";
import {roomsActions} from "./modules/rooms/rooms.actions";
import {messagesActions} from "./modules/messages/messages.actions";
import {authSlice} from "./modules/auth/auth.reducer";

export const actions = {
  user: userActions,
  rooms: roomsActions,
  messages: messagesActions,
  auth: authSlice.actions
};
