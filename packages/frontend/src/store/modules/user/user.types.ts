export const SET_USER = "SET_USER";

export type User = {
  _id: string;
  email: string;
  fullName: string;
  imageUrl: string;
  lastLogin: string;
  __v: number;
};

export type UserState = User;

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

export type UserActionTypes = SetUserAction;
