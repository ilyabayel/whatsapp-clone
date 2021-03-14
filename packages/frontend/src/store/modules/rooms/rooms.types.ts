import {User} from "../user/user.types";

export const SET_ROOMS = "SET_ROOMS";
export const SET_SELECTED_ROOM = "SET_SELECTED_ROOM";

export type Room = {
  id: string;
  participants: User[];
};

export type RoomsState = {
  rooms: Room[];
  selectedRoom: Room;
};

interface SetRoomsAction {
  type: typeof SET_ROOMS;
  payload: Room[];
}

interface SetSelectedRoomAction {
  type: typeof SET_SELECTED_ROOM;
  payload: Room;
}

export type RoomsActionsTypes = SetRoomsAction | SetSelectedRoomAction;
