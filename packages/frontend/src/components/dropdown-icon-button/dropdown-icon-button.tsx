import React, {ReactElement} from "react";
import {IconButton, Menu, MenuItem} from "@material-ui/core";

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
      <Menu keepMounted anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose(null)}>
        {items.map((el) => (
          <MenuItem onClick={handleClose(el)} key={el.label}>
            {el.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
