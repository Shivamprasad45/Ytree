"use client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { User, UserMessage } from "../../../../type"; // Adjust the import path as necessary

interface State {
  userData: User | null;
  signupStatus: UserMessage | null;
  loginStatus: UserMessage | null;
  isCreating: boolean;
  error: any | null;
}

const initialState: State = {
  userData: null,
  signupStatus: null,
  loginStatus: null,
  isCreating: false,
  error: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUserMessage(state, action: PayloadAction<UserMessage>) {
      state.signupStatus = action.payload;
    },
    setLoginMessage(state, action: PayloadAction<UserMessage>) {
      state.loginStatus = action.payload;
    },

    setIsCreating(state, action: PayloadAction<boolean>) {
      state.isCreating = action.payload;
    },
    setUserInfo(state, action: PayloadAction<User>) {
      state.userData = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setUserMessage, setIsCreating, setLoginMessage, setUserInfo } =
  authSlice.actions;
export const signupSelector = (state: { Auth: State }) =>
  state.Auth.signupStatus;
export const signupCreatingSelector = (state: { Auth: State }) =>
  state.Auth.isCreating;
export const loginSelector = (state: { Auth: State }) => state.Auth.loginStatus;
export const UserSelector = (state: { Auth: State }) => state.Auth.userData;
