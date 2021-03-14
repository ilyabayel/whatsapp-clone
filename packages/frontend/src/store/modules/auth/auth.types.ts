export const SET_TOKENS = "SET_TOKEN";

export interface ISetTokens {
  accessToken?: string;
  refreshToken?: string;
}

export type AuthState = {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
};

export type SetMessagesAction = {
  type: typeof SET_TOKENS;
  payload: {
    accessToken: string;
    refreshToken: string;
  };
};

export type MessagesActionTypes = SetMessagesAction;
