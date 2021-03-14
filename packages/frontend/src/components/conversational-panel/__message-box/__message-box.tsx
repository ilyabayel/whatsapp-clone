import React from "react";
import moment from "moment";
import {KeyboardArrowDown} from "@material-ui/icons";

import "./__message-box.scss";

interface MessageProps {
  senderId: string;
  body: string;
  timeStamp: string;
}
export function MessageBox({senderId, body, timeStamp}: MessageProps): React.ReactElement {
  return (
    <div className="message-box">
      <div className="message-box__triangle" />
      <div className="message-box__name">{senderId}</div>
      <div className="message-box__body">
        {body}
        <div className="message-box__time">{moment(timeStamp).format("LT")}</div>
      </div>
      <KeyboardArrowDown className="message-box__arrow-down" />
    </div>
  );
}
