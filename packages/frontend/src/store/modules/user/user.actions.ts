import {User, UserActionTypes, SET_USER} from "./user.types";

export function setUser(newUser: User): UserActionTypes {
  return {
    type: SET_USER,
    payload: newUser
  };
}

export const userActions = {
  setUser
};
