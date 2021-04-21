import React, {ReactElement, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Chat as ChatIcon, MoreVert as MoreVertIcon} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {Avatar} from "components/avatar/avatar";
import {SearchField} from "components/search-field/search-field";
import {ChatListItem} from "components/chat-list-item/chat-list-item";
import {Store} from "../../store/store";
import {Room} from "../../store/modules/rooms/rooms.types";
import {actions} from "../../store/actions";
import {DropdownIconButton} from "components/dropdown-icon-button/dropdown-icon-button";
import {Slider} from "components/slider/slider";
import "./sidebar.scss";

export function Sidebar(): ReactElement {
  const dispatch = useDispatch();
  const user = useSelector((state: Store) => state.user);
  const rooms = useSelector((state: Store) => state.rooms.rooms);
  const messagesDict = useSelector((state: Store) => state.messages);
  const selectedRoom = useSelector((state: Store) => state.rooms.selectedRoom);
  const [sliderIsOpen, setSliderIsOpen] = useState(false);
  const [isFocusByKeyboard, setIsFocusByKeyboard] = useState(false);
  const [selectedRoomIdx, setSelectedRoomIdx] = useState(null);

  function selectRoom(room: Room): void {
    dispatch(actions.rooms.setSelectedRoom(room));
  }

  function handleClick(room: Room) {
    selectRoom(room);
    setTimeout(() => {
      const messageInput = document.querySelector("#message-input");
      if (messageInput instanceof HTMLElement) {
        messageInput.focus();
      }
    }, 0);
  }

  function handleFocus() {
    if (selectedRoomIdx === null) {
      setSelectedRoomIdx(0);
      dispatch(selectRoom(rooms[0]));
    }
  }

  function handleKeyUp(e) {
    if (e.key === "Tab") {
      setIsFocusByKeyboard(true);
      handleFocus();
    }
  }

  function handleBlur() {
    setIsFocusByKeyboard(false);
  }

  function handleArrowKeysDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        if (selectedRoomIdx < rooms.length - 1) {
          setSelectedRoomIdx(selectedRoomIdx + 1);
          dispatch(selectRoom(rooms[selectedRoomIdx + 1]));
        }
        break;
      case "ArrowUp":
        if (selectedRoomIdx > 0) {
          setSelectedRoomIdx(selectedRoomIdx - 1);
          dispatch(selectRoom(rooms[selectedRoomIdx - 1]));
        }
        break;
      case "Enter":
        const messageInput = document.querySelector("#message-input");
        if (messageInput instanceof HTMLElement) {
          messageInput.focus();
        }
        break;
      default:
        console.log("nothing");
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header-left">
          <Avatar src={user.imageUrl} />
        </div>
        <div className="sidebar__header-right">
          <IconButton className="icon-button" onClick={() => setSliderIsOpen(true)}>
            <ChatIcon />
          </IconButton>
          <DropdownIconButton
            icon={<MoreVertIcon />}
            items={[{label: "hey", value: "hey"}]}
            onChange={(data) => console.log(data)}
          />
        </div>
      </div>
      <SearchField />
      <div
        className={`sidebar__chat-list ${isFocusByKeyboard ? "focus-keyboard" : ""}`}
        tabIndex={0}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        onKeyDown={handleArrowKeysDown}
      >
        {useMemo(() => {
          return rooms.map((room) => {
            const interlocutor = room.participants.find((el) => el._id !== user._id);
            const messages = messagesDict[room.id] ?? [];
            const lastMessage = messages[0];
            return (
              <ChatListItem
                title={interlocutor.fullName}
                avatar={interlocutor.imageUrl}
                time={lastMessage?.timestamp}
                body={lastMessage?.body}
                key={room.id}
                isSelected={room.id === selectedRoom.id}
                onClick={() => handleClick(room)}
              />
            );
          });
        }, [rooms, user, selectedRoom])}
      </div>
      <Slider onClose={() => setSliderIsOpen(false)} isOpen={sliderIsOpen} title="New chat" />
    </div>
  );
}
