"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginApi, SignupApi } from "./AuthAPI";
import { EnterUser, LoginUser, User, UserMessage } from "../../../../type"; // Adjust the import path as necessary

interface State {
  userData: User[];
  signupStatus: UserMessage | null;
  loginStatus: UserMessage | null;
  status: "idle" | "pending" | "fulfilled";
  error: any | null;
}

const initialState: State = {
  userData: [],
  signupStatus: null,
  loginStatus: null,
  status: "idle",
  error: null,
};

export const signupUserAsync = createAsyncThunk(
  "auth/SignupApi",
  async (data: EnterUser) => {
    try {
      const response = await SignupApi(data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/LoginApi",
  async (data: LoginUser) => {
    try {
      const response = await LoginApi(data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signupUserAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.signupStatus = action.payload;
      })
      .addCase(signupUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loginStatus = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export default authSlice.reducer;

export const userSelector = (state: { Auth: State }) => state.Auth.userData;
export const signupSelector = (state: { Auth: State }) =>
  state.Auth.signupStatus;
export const loginSelector = (state: { Auth: State }) => state.Auth.loginStatus;
