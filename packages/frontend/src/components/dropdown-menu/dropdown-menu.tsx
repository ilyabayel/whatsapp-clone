import React from "react";
import "./dropdown-menu.scss";
import {Modal} from "../modal/modal";

interface DropdownMenuProps {
  children: null | React.ReactNode;
  anchorEl: null | Element;
  onClose: () => void;
}

export function DropdownMenu({children, anchorEl, onClose}: DropdownMenuProps): JSX.Element {
  if (anchorEl === null) return null;
  const {bottom, right} = anchorEl.getBoundingClientRect();

  return (
    <Modal onClick={onClose}>
      <div
        className="dropdown-menu"
        style={{position: "fixed", top: bottom, right: window.innerWidth - right}}
      >
        <ul className="dropdown-menu__list">{children}</ul>
      </div>
    </Modal>
  );
}
