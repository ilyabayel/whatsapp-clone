export const SET_AUTH = "SET_AUTH";

export interface SetAuthProps {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: string;
}

export type AuthState = {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
};

export type SetMessagesAction = {
  type: typeof SET_AUTH;
  payload: SetAuthProps;
};
