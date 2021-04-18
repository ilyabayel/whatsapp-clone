import React from "react";
import {Search as SearchIcon} from "@material-ui/icons";
import "./search-field.scss";

export function SearchField(): JSX.Element {
  return (
    <div className="search-field">
      <div className="search-field__control">
        <div className="search-field__icon-field">
          <SearchIcon className="search-field__icon" />
        </div>
        <input className="search-field__input" placeholder="Search or start new chat" />
      </div>
    </div>
  );
}
