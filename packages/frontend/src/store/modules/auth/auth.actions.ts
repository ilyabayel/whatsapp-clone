import {ISetTokens, SET_TOKENS, SetMessagesAction} from "./auth.types";

function setTokens({accessToken, refreshToken}: ISetTokens): SetMessagesAction {
  return {
    type: SET_TOKENS,
    payload: {
      accessToken,
      refreshToken
    }
  };
}

export const authActions = {
  setTokens
};
