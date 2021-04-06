import React, {ReactElement, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Chat as ChatIcon, MoreVert as MoreVertIcon} from "@material-ui/icons";
import {IconButton, Menu, MenuItem} from "@material-ui/core";

import {Avatar} from "components/avatar/avatar";
import "./sidebar.scss";
import {SearchField} from "components/search-field/search-field";
import {ChatListItem} from "components/chat-list-item/chat-list-item";
import {Store} from "../../store/store";
import {Room} from "../../store/modules/rooms/rooms.types";
import {actions} from "../../store/actions";
import {DropdownIconButton} from "components/dropdown-icon-button/dropdown-icon-button";
import {DropdownMenu} from "components/dropdown-menu/dropdown-menu";
import {DropdownMenuItem} from "components/dropdown-menu-item/dropdown-menu-item";

export function Sidebar(): ReactElement {
  const dispatch = useDispatch();
  const user = useSelector((state: Store) => state.user);
  const rooms = useSelector((state: Store) => state.rooms.rooms);
  const messagesDict = useSelector((state: Store) => state.messages);
  const selectedRoom = useSelector((state: Store) => state.rooms.selectedRoom);
  const [anchorEl, setAnchorEl] = useState(null);

  const selectRoom = (room: Room): void => {
    dispatch(actions.rooms.setSelectedRoom(room));
  };

  function handleMenuOpen(e: React.MouseEvent) {
    setAnchorEl(e.currentTarget);
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header-left">
          <Avatar src={user.imageUrl} />
        </div>
        <div className="sidebar__header-right">
          <IconButton className="icon-button" onClick={handleMenuOpen}>
            <ChatIcon />
          </IconButton>
          <DropdownMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
            <DropdownMenuItem onClick={() => setAnchorEl(null)}>Hello</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAnchorEl(null)}>Hello</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAnchorEl(null)}>Hello</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAnchorEl(null)}>Hello</DropdownMenuItem>
          </DropdownMenu>
          <DropdownIconButton
            icon={<MoreVertIcon />}
            items={[{label: "hey", value: "hey"}]}
            onChange={(data) => console.log(data)}
          />
        </div>
      </div>
      <div className="sidebar__search-form">
        <SearchField />
      </div>
      <div className="sidebar__chat-list">
        {useMemo(() => {
          return rooms.map((room, idx) => {
            const interlocutor = room.participants.find((el) => el._id !== user._id);
            const messages = messagesDict[room.id] ?? [];
            const lastMessage = messages[0];
            return (
              <ChatListItem
                title={interlocutor.fullName}
                avatar={interlocutor.imageUrl}
                time={lastMessage?.timestamp}
                body={lastMessage?.body}
                key={"room" + idx}
                isSelected={room.id === selectedRoom.id}
                onClick={() => selectRoom(room)}
              />
            );
          });
        }, [rooms, user, selectedRoom])}
      </div>
    </div>
  );
}
