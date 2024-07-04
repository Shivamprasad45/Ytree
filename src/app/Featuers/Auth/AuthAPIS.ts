// services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Data,
  EnterUser,
  LoginUser,
  User,
  UserMessage,
} from "../../../../type";
import {
  setIsCreating,
  setLoginMessage,
  setUserInfo,
  setUserMessage,
} from "./AuthSlice";

// Define a service using a base URL and expected endpoints
export const AuthApi = createApi({
  reducerPath: "AUTHZ",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
  endpoints: (builder) => ({
    getuserInfoByName: builder.query<User, void>({
      query: () => `/me`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.error("Fetching user info failed:", error);
        } finally {
        }
      },
    }),
    createUser: builder.mutation<UserMessage, EnterUser>({
      query: (userData) => ({
        url: `/Signup`,
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(setIsCreating(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserMessage(data));
        } catch (error) {
          console.error("Signup failed:", error);
        } finally {
          dispatch(setIsCreating(false));
        }
      },
    }),
    LoginUser: builder.mutation<UserMessage, LoginUser>({
      query: (userData) => ({
        url: `/Login`,
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(setIsCreating(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoginMessage(data));
        } catch (error) {
          console.error("Login failed:", error);
        } finally {
          dispatch(setIsCreating(false));
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetuserInfoByNameQuery,
  useCreateUserMutation,
  useLoginUserMutation,
} = AuthApi;
