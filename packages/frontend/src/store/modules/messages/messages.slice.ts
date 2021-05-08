import {Message, MessagesState} from "./messages.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const messagesState: MessagesState = {};

export const messagesSlice = createSlice({
  initialState: messagesState,
  name: "messages",
  reducers: {
    setMessages: (state, action: PayloadAction<MessagesState>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state[action.payload.roomId].unshift(action.payload);
    },
    deleteMessage: (state, action: PayloadAction<Message>) => {
      state[action.payload.roomId].forEach((message) => {
        if (message._id === action.payload._id) {
          message.isDeleted = true;
        }
      });
    }
  }
});
