import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Room, RoomsState} from "./rooms.types";

const initialState: RoomsState = {
  rooms: Array(2)
    .fill(0)
    .map(
      (el: number, index: number): Room => ({
        id: `r${index + 1}`,
        participants: [
          {
            _id: "607e91a055fdeb0023e9db56",
            fullName: "Ilya Kozlov",
            email: "ilyako2497@gmail.com",
            imageUrl:
              "https://avatars2.githubusercontent.com/u/43450718?s=460&u=d3c12e1cf19f9f214994e6e85362f4b8b0581d4c&v=4",
            lastLogin: "",
            __v: 0
          },
          {
            _id: "d16",
            fullName: "Dima Kozlov",
            email: "dima@kozlov.dev",
            imageUrl:
              "https://sun9-23.userapi.com/impf/c633317/v633317341/35e2/rfbvPwxvLzI.jpg?size=2560x1440&quality=96&sign=700da9a73c0c5631ab7534e68489a0cc&type=album",
            lastLogin: "",
            __v: 0
          }
        ]
      })
    ),
  selectedRoom: {id: "-1", participants: []}
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
    setSelectedRoom: (state, action: PayloadAction<Room>) => {
      state.selectedRoom = action.payload;
    }
  }
});
