import React, {ReactElement} from "react";
import {MessageBox} from "components/conversational-panel/__message-box/__message-box";
import {MessageLine} from "components/conversational-panel/__message-line/__message-line";
import {Message} from "../../store/modules/messages/messages.types";
import {User} from "../../store/modules/user/user.types";
import "./conversational-panel.scss";

type Props = {
  messages: Message[];
  user: User;
};

export function ConversationalPanel({messages, user}: Props): ReactElement {
  return (
    <div className="conversational-panel">
      {messages.map((message) => (
        <MessageLine isUser={user._id === message.senderId} key={message._id}>
          <MessageBox
            senderId={message.senderId}
            body={message.body}
            timeStamp={message.timestamp}
          />
        </MessageLine>
      ))}
    </div>
  );
}
