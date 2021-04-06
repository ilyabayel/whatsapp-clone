import React, {useState} from "react";
import moment from "moment";
import {KeyboardArrowDown} from "@material-ui/icons";

import "./__message-box.scss";
import {DropdownMenu} from "components/dropdown-menu/dropdown-menu";
import {DropdownMenuItem} from "components/dropdown-menu-item/dropdown-menu-item";

interface MessageProps {
  senderId: string;
  body: string;
  timeStamp: string;
}
export function MessageBox({senderId, body, timeStamp}: MessageProps): React.ReactElement {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div className="message-box">
      <div className="message-box__triangle" />
      <div className="message-box__name">{senderId}</div>
      <div className="message-box__body">
        {body}
        <div className="message-box__time">{moment(timeStamp).format("LT")}</div>
      </div>
      <KeyboardArrowDown className="message-box__arrow-down" onClick={handleClick} />
      <DropdownMenu anchorEl={anchorEl} onClose={handleClose}>
        <DropdownMenuItem onClick={handleClose}>hey</DropdownMenuItem>
        <DropdownMenuItem onClick={handleClose}>hey</DropdownMenuItem>
        <DropdownMenuItem onClick={handleClose}>hey</DropdownMenuItem>
      </DropdownMenu>
    </div>
  );
}
