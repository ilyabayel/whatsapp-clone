import React from "react";

import "./__message-line.scss";

export function MessageLine(props: {
  isUser: boolean;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div
      className={`conversational-panel__message-line ${
        props.isUser ? "message-line_user" : "message-line_interlocutor"
      }`}
    >
      {props.children}
    </div>
  );
}
