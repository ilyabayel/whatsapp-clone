import {userActions} from "./modules/user/user.actions";
import {roomsActions} from "./modules/rooms/rooms.actions";
import {messagesActions} from "./modules/messages/messages.actions";
import {authActions} from "./modules/auth/auth.actions";

export const actions = {
  user: userActions,
  rooms: roomsActions,
  messages: messagesActions,
  auth: authActions
};
