import {CURRENT_LOCALE} from "../constants/intl";

export const hhmmFormatter = new Intl.DateTimeFormat(CURRENT_LOCALE, {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit"
});
