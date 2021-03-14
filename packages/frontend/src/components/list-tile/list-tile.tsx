import React, {ReactElement} from "react";

import "./list-tile.scss";
import {Avatar} from "components/avatar/avatar";

const defaultAvatar =
  "https://bootstrap-material-ui.exentriq.com/assets/img/doc/avatar/avatar_0.jpg";

interface ListTileInterface {
  avatar?: string;
  title?: string;
  body?: string;
}

export function ListTile({avatar, title, body}: ListTileInterface): ReactElement {
  return (
    <div className="list-tile">
      <div className="list-tile__leading">
        <Avatar src={avatar ?? defaultAvatar} />
      </div>
      <div className="list-tile__main">
        <div className="list-tile__title">{title}</div>
        <div className="list-tile__body">{body}</div>
      </div>
    </div>
  );
}
