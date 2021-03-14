import {IsetAuth, SET_AUTH, SetMessagesAction} from "./auth.types";
import {setItemsToLocalStorage} from "../../../utils/local-storage.utils";

function setAuth({accessToken, refreshToken, expiresIn}: IsetAuth): SetMessagesAction {
  setItemsToLocalStorage({accessToken, refreshToken, expiresIn});
  return {
    type: SET_AUTH,
    payload: {
      accessToken,
      refreshToken,
      expiresIn
    }
  };
}

export const authActions = {
  setAuth
};
