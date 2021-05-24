import React, {useState} from "react";
import "./user-list.scss";
import {UserListProps} from "components/sidebar/types";

export function UserList({items = []}: UserListProps): React.ReactElement {
  const [focusedCardIdx, setFocusedCardIdx] = useState(0);

  return (
    <div className="user-list">
      {items.map((item, idx) => (
        <button className="user-list__card" key={item.value}>
          {item.label}
        </button>
      ))}
    </div>
  );
}
