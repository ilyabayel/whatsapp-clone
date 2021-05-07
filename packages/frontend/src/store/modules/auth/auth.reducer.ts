import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState, SetAuthProps} from "./auth.types";

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  expiresIn: localStorage.getItem("expiresIn"),
  refreshToken: localStorage.getItem("refreshToken")
};

export const authSlice = createSlice({
  name: "setAuth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<SetAuthProps>) => ({
      ...state,
      ...action.payload
    })
  }
});
