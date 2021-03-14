import {AuthState, MessagesActionTypes, SET_AUTH} from "./auth.types";

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  expiresIn: localStorage.getItem("expiresIn"),
  refreshToken: localStorage.getItem("refreshToken")
};

export function authReducer(state = initialState, action: MessagesActionTypes): AuthState {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        ...action.payload
      };
    default:
      return {
        ...state
      };
  }
}
