import React, {ReactElement, useCallback, useState} from "react";
import {Mood as MoodIcon, AttachFile as AttachFileIcon, Mic as MicIcon} from "@material-ui/icons";
import {messagesService} from "../../api/messages/messages";
import {IconButton} from "@material-ui/core";
import moment from "moment";
import {Room} from "../../store/modules/rooms/rooms.types";
import {User} from "../../store/modules/user/user.types";
import "./text-panel.scss";

type Props = {
  room: Room;
  user: User;
};

export function TextPanel({user, room}: Props): ReactElement {
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      moment.locale("ru");
      messagesService.create({
        body: message,
        timestamp: moment().format(),
        images: [],
        senderId: user._id,
        roomId: room.id,
        isDeleted: false,
        isRead: false
      });
      setMessage("");
    },
    [message]
  );

  return (
    <div className="text-panel">
      <div className="text-panel__btn-container">
        <IconButton>
          <MoodIcon />
        </IconButton>
      </div>
      <div className="text-panel__btn-container">
        <IconButton>
          <AttachFileIcon className="text-panel__attach-file-icon" />
        </IconButton>
      </div>
      <div className="text-panel__input-container">
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="text-panel__input-box"
          autoComplete="off"
        >
          <input
            id="message-input"
            placeholder="Enter your message"
            type="text"
            value={message}
            onChange={(event): void => setMessage(event.target.value)}
          />
        </form>
      </div>
      <div className="text-panel__btn-container">
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}
