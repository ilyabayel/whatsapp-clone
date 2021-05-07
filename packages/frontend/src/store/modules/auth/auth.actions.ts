import {SetAuthProps, SET_AUTH} from "./auth.types";
import {createAction} from "@reduxjs/toolkit";

export const setAuth = createAction<SetAuthProps, typeof SET_AUTH>(SET_AUTH);

export const authActions = {
  setAuth
};
