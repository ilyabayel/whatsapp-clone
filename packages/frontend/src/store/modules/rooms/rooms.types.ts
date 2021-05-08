import {User} from "../user/user.types";

export type Room = {
  id: string;
  participants: User[];
};

export type RoomsState = {
  rooms: Room[];
  selectedRoom: Room;
};
