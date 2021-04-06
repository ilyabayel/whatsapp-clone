import React, {ReactElement} from "react";
import {IconButton} from "@material-ui/core";
import {DropdownMenu} from "components/dropdown-menu/dropdown-menu";
import {DropdownMenuItem} from "components/dropdown-menu-item/dropdown-menu-item";

type Item = {
  label: string;
  value: string;
};

interface Dropdown_I {
  icon: ReactElement;
  items: Item[];
  onChange?: (Item) => void;
}

export function DropdownIconButton({icon, items, onChange}: Dropdown_I): ReactElement {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (el) => () => {
    setAnchorEl(null);
    onChange && onChange(el);
  };

  return (
    <>
      <IconButton className="icon-button" onClick={handleClick}>
        {icon}
      </IconButton>
      <DropdownMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        {items.map((el) => (
          <DropdownMenuItem onClick={handleClose(el.value)} key={el.label}>
            {el.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </>
  );
}
