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
