"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginApi, SignupApi } from "./AuthAPI";
import { EnterUser, User, UserMessage } from "../../../../type";

interface State {
  userData: User[];
  signupStatus: UserMessage | null;
  LoginStatus: UserMessage | null;
  // Use lowercase 'userData' for consistency
  status: "idle" | "pending" | "fulfilled";
  error: any | null; // Allow for different error types or null
}

const initialState: State = {
  userData: [],
  signupStatus: null,
  LoginStatus: null,
  status: "idle",
  error: null,
};

export const signupUserAsync = createAsyncThunk(
  "auth/SignupApi", // More descriptive action name
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
export const LoginUserAsync = createAsyncThunk(
  "auth/LoginApi", // More descriptive action name
  async (data: EnterUser) => {
    try {
      const response = await LoginApi(data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const AuthSlice = createSlice({
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
        // Update userData based on backend response structure:

        state.signupStatus = action.payload; // Assuming first element is the created user
      })
      .addCase(signupUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(LoginUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(LoginUserAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        // Update userData based on backend response structure:

        state.LoginStatus = action.payload; // Assuming first element is the created user
      })
      .addCase(LoginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export default AuthSlice.reducer;

export const userSelector = (state: { Auth: State }) => state.Auth.userData;
// No spread operator needed
export const SignupSelector = (state: { Auth: State }) =>
  state.Auth.signupStatus;
export const LoginSelector = (state: { Auth: State }) => state.Auth.LoginStatus;
