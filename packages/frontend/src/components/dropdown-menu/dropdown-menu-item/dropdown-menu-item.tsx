import React from "react";
import "./dropdown-menu-item.scss";

interface DropdownMenuItemProps {
  children?: null | React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  focused?: boolean;
}

export function DropdownMenuItem({children, onClick}: DropdownMenuItemProps): React.ReactElement {
  return (
    <li>
      <button className="dropdown-menu-item" onClick={onClick}>
        {children}
      </button>
    </li>
  );
}
