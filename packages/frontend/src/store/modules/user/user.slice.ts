import {createSlice} from "@reduxjs/toolkit";
import {User} from "./user.types";

const initialState: User = {
  _id: "",
  fullName: "",
  email: "",
  lastLogin: "",
  imageUrl: "",
  __v: 0
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action) => action.payload
  }
});
