import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  MessagesActionsTypes,
  MessagesState,
  SET_MESSAGES
} from "./messages.types";

const messagesState: MessagesState = {};

export function messagesReducer(
  state = messagesState,
  action: MessagesActionsTypes
): MessagesState {
  switch (action.type) {
    case SET_MESSAGES:
      return {...action.payload};
    case ADD_MESSAGE:
      return {...state, [action.payload.roomId]: [action.payload, ...state[action.payload.roomId]]};
    case DELETE_MESSAGE:
      const newMessages = state[action.payload.roomId].map((message) => {
        if (message._id !== action.payload._id) return message;
        return {...message, isDeleted: true};
      });
      return {...state, [action.payload.roomId]: newMessages};
    default:
      return {...state};
  }
}
