import React from "react";
import "./dropdown-menu.scss";
import {Modal} from "../modal/modal";

interface DropdownMenuProps {
  children: null | React.ReactNode;
  anchorEl: null | Element;
  onClose: () => void;
}

function getDirection(bottom, right) {
  let vertical: "top" | "bottom" = "bottom";
  let horizontal: "left" | "right" = "left";

  if (bottom > window.innerHeight - window.innerHeight * 0.3) {
    vertical = "top";
  }
  if (right < window.innerWidth - window.innerHeight * 0.3) {
    horizontal = "right";
  }

  return vertical + "-" + horizontal;
}

export function DropdownMenu({children, anchorEl, onClose}: DropdownMenuProps): JSX.Element {
  if (anchorEl === null) return null;

  const anchorRect = anchorEl.getBoundingClientRect();

  const direction = getDirection(anchorRect.bottom, anchorRect.right);

  let position;

  switch (direction) {
    case "bottom-left":
      position = {
        top: anchorRect.bottom,
        right: window.innerWidth - anchorRect.right
      };
      break;
    case "bottom-right":
      position = {
        top: anchorRect.bottom,
        left: anchorRect.left
      };
      break;
    case "top-left":
      position = {
        bottom: window.innerHeight - anchorRect.top,
        right: window.innerWidth - anchorRect.right
      };
      break;
    case "top-right":
      position = {
        bottom: window.innerHeight - anchorRect.top,
        left: anchorRect.left
      };
      break;
    default:
      position = {
        top: 0,
        left: 0
      };
      break;
  }

  return (
    <Modal onClick={onClose}>
      <div
        className={`dropdown-menu direction_${direction}`}
        style={{position: "fixed", ...position}}
      >
        <ul className="dropdown-menu__list">{children}</ul>
      </div>
    </Modal>
  );
}
