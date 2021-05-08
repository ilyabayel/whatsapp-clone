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
