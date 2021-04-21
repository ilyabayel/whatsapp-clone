import React, {ReactElement} from "react";
import {IconButton} from "@material-ui/core";
import {DropdownMenu, MenuItem_t} from "components/dropdown-menu/dropdown-menu";

interface Dropdown_I {
  icon: ReactElement;
  items: MenuItem_t[];
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
      <DropdownMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} items={items} />
    </>
  );
}
