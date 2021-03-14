import {Message, MessagesState} from "../../store/modules/messages/messages.types";
import moment from "moment";
import {apiService} from "../api-service";
import {AxiosResponse} from "axios";

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
              timestamp: moment().format()
            },
            {
              _id: "m2",
              roomId: "r1",
              isRead: false,
              images: [],
              isDeleted: false,
              body: "Message N2",
              senderId: "d16",
              timestamp: moment().format()
            },
            {
              _id: "m1",
              roomId: "r1",
              isRead: false,
              images: [],
              isDeleted: false,
              body: "Message N1",
              senderId: "d15",
              timestamp: moment().format()
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
              timestamp: moment().format()
            },
            {
              _id: "m7",
              roomId: "r2",
              isRead: false,
              images: [],
              isDeleted: false,
              body: "Message #7",
              senderId: "d16",
              timestamp: moment().format()
            },
            {
              _id: "m6",
              roomId: "r2",
              isRead: false,
              images: [],
              isDeleted: false,
              body: "Message #6",
              senderId: "d15",
              timestamp: moment().format()
            },
            {
              _id: "m5",
              roomId: "r2",
              isRead: false,
              images: [],
              isDeleted: false,
              body: "Message #5",
              senderId: "d16",
              timestamp: moment().format()
            },

            {
              _id: "m4",
              roomId: "r2",
              isRead: false,
              images: [],
              isDeleted: false,
              body: "Message #4",
              senderId: "d16",
              timestamp: moment().format()
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
