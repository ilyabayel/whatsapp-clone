import React from "react";
import "./dropdown-menu-item.scss";

interface DropdownMenuItemProps {
  children?: null | React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
}

export function DropdownMenuItem({children, onClick}: DropdownMenuItemProps): React.ReactElement {
  return (
    <li className="dropdown-menu-item" onClick={onClick}>
      {children}
    </li>
  );
}
