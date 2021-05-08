import React, {ReactElement} from "react";
import {KeyboardArrowDown} from "@material-ui/icons";
import {hhmmFormatter} from "../../utils/date";

import "./chat-list-item.scss";

interface ChatListItemProps {
  avatar?: string;
  title?: string;
  body?: string;
  time?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const defaultProps: ChatListItemProps = {
  avatar: "https://bootstrap-material-ui.exentriq.com/assets/img/doc/avatar/avatar_0.jpg",
  title: "",
  body: "",
  time: "",
  isSelected: false
};

export function ChatListItem({
  avatar,
  title,
  body,
  time,
  isSelected,
  onClick
}: ChatListItemProps): ReactElement {
  return (
    <div
      className={`chat-list-item ${isSelected ? "chat-list-item_selected" : ""}`}
      onClick={onClick}
    >
      <div className="chat-list-item__leading">
        <img src={avatar ?? defaultProps.avatar} alt="avatar" className="chat-list-item__avatar" />
      </div>
      <div className="chat-list-item__main">
        <div className="chat-list-item__header">
          <span className="chat-list-item__title">{title}</span>
          <span className="chat-list-item__time">
            {time && hhmmFormatter.format(parseInt(time))}
          </span>
        </div>
        <div className="chat-list-item__body">
          <span className="chat-list-item__body-text">{body}</span>
          <KeyboardArrowDown className="chat-list-item__arrow-down" />
        </div>
      </div>
    </div>
  );
}
