import React, {ReactElement} from "react";
import {IconButton} from "@material-ui/core";
import {MoreVert as MoreVertIcon, Search as SearchIcon} from "@material-ui/icons";
import {ListTile} from "components/list-tile/list-tile";
import {User} from "../../store/modules/user/user.types";
import "./chat-header.scss";

type Props = {
  participant: User;
};

export function ChatHeader({participant}: Props): ReactElement {
  return (
    <div className="chat-header">
      <div className="chat-header__leading">
        <ListTile
          title={participant.fullName}
          body="Был(-а) 13 минут назад"
          avatar={participant.imageUrl}
        />
      </div>
      <div className="chat-header__actions">
        <IconButton className="icon-button">
          <SearchIcon />
        </IconButton>
        <IconButton className="icon-button">
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
}
