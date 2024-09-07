// services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  All_Users,
  Coordinate,
  IPlantProfile,
  TreeInfo,
} from "../../../../type";

// Define a service using a base URL and expected endpoints
export const GlobelApi = createApi({
  reducerPath: "Gloabe",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/Tree" }),
  endpoints: (builder) => ({
    getALL_coords: builder.query<Coordinate[], void>({
      query: () => `/All_coords`,
    }),
    getAll_users: builder.query<All_Users[], void>({
      query: () => ({
        url: `/All_users`,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetALL_coordsQuery, useGetAll_usersQuery } = GlobelApi;
