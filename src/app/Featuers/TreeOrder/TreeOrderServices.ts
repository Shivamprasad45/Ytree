// services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Enter_Plant_coords,
  IPlantProfile,
  Plant_coords,
  Plant_order,
  UserMessage,
} from "../../../../type";
import { MyTrees_Dis } from "./TreeOrderSlice";
import { toast } from "sonner";

// Define a service using a base URL and expected endpoints
export const TreeOrder_API = createApi({
  tagTypes: ["Order"],
  reducerPath: "Order",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/Tree" }),
  endpoints: (builder) => ({
    getMyTreeInfoBy_id: builder.query<IPlantProfile[], string>({
      query: (User_Id) => ({
        url: `/Mytree?User_Id=${User_Id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
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
    Save_plants_coords: builder.mutation<UserMessage, Enter_Plant_coords>({
      query: (data) => ({
        url: `/Coords`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            toast(data.message);
          }
          if (data.error) {
            toast(data.error);
          }
        } catch (error) {
          console.error("Fetching user info failed:", error);
        } finally {
        }
      },
    }),
    Save_plants_Order: builder.mutation<UserMessage, Plant_order>({
      query: (data) => ({
        url: `/Order`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            toast(data.message);
          }
          if (data.error) {
            toast(data.message);
          }
        } catch (error) {
          console.error("Fetching user info failed:", error);
        } finally {
        }
      },
    }),
    About_my_tree: builder.query<Plant_coords, string>({
      query: (id) => ({
        url: `/Coords?id=${id}`,
        method: "GET",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
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
export const {
  useGetMyTreeInfoBy_idQuery,
  useSave_plants_coordsMutation,
  useSave_plants_OrderMutation,
  useAbout_my_treeQuery,
} = TreeOrder_API;
