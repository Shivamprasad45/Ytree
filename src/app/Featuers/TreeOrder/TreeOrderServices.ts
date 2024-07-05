// services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Data,
  EnterUser,
  IPlantProfile,
  LoginUser,
  User,
  UserMessage,
} from "../../../../type";
import { MyTrees_Dis } from "./TreeOrderSlice";

// Define a service using a base URL and expected endpoints
export const TreeOrder_API = createApi({
  reducerPath: "Order",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/Tree" }),
  endpoints: (builder) => ({
    getMyTreeInfoBy_id: builder.query<IPlantProfile[], string>({
      query: (User_Id) => ({
        url: `/Mytree?User_Id=${User_Id}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(MyTrees_Dis(data));
        } catch (error) {
          console.error("Fetching user info failed:", error);
        } finally {
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMyTreeInfoBy_idQuery } = TreeOrder_API;
