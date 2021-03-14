export const SET_MESSAGES = "SET_MESSAGES";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

export type Message = {
  _id?: string;
  _v?: number;
  senderId: string;
  roomId: string;
  body: string;
  images: string[];
  timestamp: string;
  isRead: boolean;
  isDeleted: boolean;
};

export type MessagesState = {
  [roomId: string]: Message[];
};

interface SetMessagesAction {
  type: typeof SET_MESSAGES;
  payload: MessagesState;
}

interface AddMessageAction {
  type: typeof ADD_MESSAGE;
  payload: Message;
}

interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE;
  payload: Message;
}

export type MessagesActionsTypes = SetMessagesAction | AddMessageAction | DeleteMessageAction;
