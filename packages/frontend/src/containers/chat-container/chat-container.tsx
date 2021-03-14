import React, {ReactElement} from "react";
import {useSelector} from "react-redux";
import {ConversationalPanel} from "components/conversational-panel/conversational-panel";
import {TextPanel} from "components/text-panel/text-panel";
import {ChatHeader} from "components/chat-header/chat-header";
import {ChatDummy} from "components/chat-dummy/chat-dummy";
import {Store} from "../../store/store";
import "./chat-container.scss";

export function ChatContainer(): ReactElement {
  const user = useSelector((state: Store) => state.user);
  const room = useSelector((state: Store) => state.rooms.selectedRoom);
  const participant = useSelector((state: Store) =>
    state.rooms.selectedRoom.participants.find((u) => u._id !== user._id)
  );
  const messages = useSelector((state: Store) => state.messages[room.id] ?? []);

  if (room.id === "-1") {
    return (
      <div className="chat">
        <ChatDummy
          reasonHeading="Чат не выбран"
          description="Выберите чат из списка или начните новый"
        />
      </div>
    );
  }

  return (
    <div className="chat">
      <ChatHeader participant={participant} />
      <ConversationalPanel messages={messages} user={user} />
      <TextPanel room={room} user={user} />
    </div>
  );
}
