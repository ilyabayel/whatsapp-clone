import {Message, MessagesState} from "../../store/modules/messages/messages.types";
import {AxiosResponse} from "axios";
import {apiService} from "../api-service";

export const messagesService = {
  getAll(): Promise<MessagesState> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          r1: [
            {
              _id: "m3",
              roomId: "r1",
              isRead: false,
              images: [],
              isDeleted: false,
              body: "Message N3",
              senderId: "d15",
              timestamp: Date.now().toString()
            },
            {
              _id: "m2",
              roomId: "r1",
              isRead: false,
              images: [],
              isDeleted: false,
              body: "Message N2",
              senderId: "d16",
              timestamp: Date.now().toString()
            },
            {
              _id: "m1",
              roomId: "r1",
              isRead: false,
              images: [],
              isDeleted: false,
              body: "Message N1",
              senderId: "d15",
              timestamp: Date.now().toString()
            }
          ],
          r2: [
            {
              _id: "m8",
              roomId: "r2",
              isRead: false,
              images: [],
              isDeleted: false,
              body: "Message #8",
              senderId: "d15",
              timestamp: Date.now().toString()
            },
            {
              _id: "m7",
              roomId: "r2",
              isRead: false,
              images: [],
              isDeleted: false,
              body: "Message #7",
              senderId: "d16",
              timestamp: Date.now().toString()
            },
            {
              _id: "m6",
              roomId: "r2",
              isRead: false,
              images: [],
              isDeleted: false,
              body: "Message #6",
              senderId: "d15",
              timestamp: Date.now().toString()
            },
            {
              _id: "m5",
              roomId: "r2",
              isRead: false,
              images: [],
              isDeleted: false,
              body: "Message #5",
              senderId: "d16",
              timestamp: Date.now().toString()
            },

            {
              _id: "m4",
              roomId: "r2",
              isRead: false,
              images: [],
              isDeleted: false,
              body: "Message #4",
              senderId: "d16",
              timestamp: Date.now().toString()
            }
          ]
        });
      }, 300);
    });
  },

  create(message: Message): Promise<AxiosResponse<Message>> {
    return apiService.instance.post<Message>("/messages", message);
  }
};
