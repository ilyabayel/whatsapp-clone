import {SET_USER, User, UserActionTypes} from "./user.types";

const defaultState: User = {
  _id: "",
  fullName: "",
  email: "",
  lastLogin: "",
  imageUrl: "",
  __v: 0
};

export function userReducer(state = defaultState, action: UserActionTypes): typeof defaultState {
  switch (action.type) {
    case SET_USER:
      return {...state, ...action.payload};
    default:
      return {...state};
  }
}
