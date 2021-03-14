import React, {ReactElement} from "react";

import "./search-field.scss";
import {Search as SearchIcon} from "@material-ui/icons";

export class SearchField extends React.Component {
  render(): ReactElement {
    return (
      <div className="search-field">
        <div className="search-field__icon-field">
          <SearchIcon className="search-field__icon" />
        </div>
        <input className="search-field__input" placeholder="Search or start new chat" />
      </div>
    );
  }
}
