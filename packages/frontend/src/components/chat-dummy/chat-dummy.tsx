import React, {ReactElement} from "react";
import "./chat-dummy.scss";

type Props = {
  reasonHeading?: string;
  description?: string;
};

export function ChatDummy({reasonHeading = "", description = ""}: Props): ReactElement {
  return (
    <div className="chat-dummy">
      <h2>{reasonHeading}</h2>
      <p>{description}</p>
    </div>
  );
}
