import React, {ReactElement} from "react";

import "./popover-menu.scss";

type PopoverMenuItem = {
  displayName: string;
  handler(): void;
};

function renderItems(items: PopoverMenuItem[]) {
  return items.map((item) => (
    <li className="popover-menu__item" onClick={item.handler} key={item.displayName}>
      {item.displayName}
    </li>
  ));
}

export class PopoverMenu extends React.Component<{items: PopoverMenuItem[]}, never> {
  render(): ReactElement {
    return (
      <div className="popover-menu">
        <ul className="popover-menu__item-list">{renderItems(this.props.items)}</ul>
      </div>
    );
  }
}
