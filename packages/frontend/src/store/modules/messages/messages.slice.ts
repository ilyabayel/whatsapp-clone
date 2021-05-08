import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message, MessagesState} from "./messages.types";

const initialState: MessagesState = {};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
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
