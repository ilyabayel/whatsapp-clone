import React, {useEffect, useRef, useState} from "react";
import {Modal} from "../modal/modal";
import {DropdownMenuItem} from "components/dropdown-menu/dropdown-menu-item/dropdown-menu-item";
import "./dropdown-menu.scss";

export type MenuItem_t = {
  label: string;
  value: string;
};

interface DropdownMenuProps {
  items: MenuItem_t[];
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

export function DropdownMenu({items, anchorEl, onClose}: DropdownMenuProps): React.ReactElement {
  const listEl = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (listEl.current instanceof HTMLElement) {
      listEl.current.focus();
    }
  }, [anchorEl]);

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

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.stopPropagation();
      if (anchorEl instanceof HTMLElement) {
        anchorEl.focus();
      }
      onClose();
    }
  }

  function handleChoose(item: MenuItem_t) {
    console.log(item.value);
    onClose();
  }

  return (
    <Modal onClick={onClose}>
      <div
        className={`dropdown-menu direction_${direction}`}
        style={{position: "fixed", ...position}}
        tabIndex={-1}
      >
        <ul className="dropdown-menu__list" ref={listEl} onKeyDown={handleKeyDown}>
          {items.map((item, idx) => (
            <DropdownMenuItem onClick={() => handleChoose(item)} key={item.value}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
