import {Room, RoomsActionsTypes, RoomsState, SET_ROOMS, SET_SELECTED_ROOM} from "./rooms.types";

const defaultState: RoomsState = {
  rooms: Array(2)
    .fill(0)
    .map(
      (el: number, index: number): Room => ({
        id: `r${index + 1}`,
        participants: [
          {
            _id: "d15",
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
              "https://media-exp1.licdn.com/dms/image/C5603AQGUmeLJdkCvZg/profile-displayphoto-shrink_800_800/0?e=1609372800&v=beta&t=bRsclU6bd0zLrsACEMuqkXDG1x4sGmjsYQLciRZn8sM",
            lastLogin: "",
            __v: 0
          }
        ]
      })
    ),
  selectedRoom: {id: "-1", participants: []}
};

export function roomsReducer(state = defaultState, action: RoomsActionsTypes): RoomsState {
  switch (action.type) {
    case SET_ROOMS:
      return {...state, rooms: action.payload};
    case SET_SELECTED_ROOM:
      return {...state, selectedRoom: action.payload};
    default:
      return {...state};
  }
}
