import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  Message,
  MessagesActionsTypes,
  MessagesState,
  SET_MESSAGES
} from "./messages.types";

function setMessages(messages: MessagesState): MessagesActionsTypes {
  return {
    type: SET_MESSAGES,
    payload: messages
  };
}

function addMessage(message: Message): MessagesActionsTypes {
  return {
    type: ADD_MESSAGE,
    payload: message
  };
}

function deleteMessage(message: Message): MessagesActionsTypes {
  return {
    type: DELETE_MESSAGE,
    payload: message
  };
}

export const messagesActions = {
  setMessages,
  addMessage,
  deleteMessage
};
