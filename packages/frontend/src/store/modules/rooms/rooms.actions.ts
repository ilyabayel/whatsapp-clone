import {Room, RoomsActionsTypes, SET_ROOMS, SET_SELECTED_ROOM} from "./rooms.types";

function setRooms(rooms: Room[]): RoomsActionsTypes {
  return {
    type: SET_ROOMS,
    payload: rooms
  };
}

function setSelectedRoom(room: Room): RoomsActionsTypes {
  return {
    type: SET_SELECTED_ROOM,
    payload: room
  };
}

export const roomsActions = {
  setRooms,
  setSelectedRoom
};
