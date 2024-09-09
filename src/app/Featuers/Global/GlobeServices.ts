// services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { All_Users, Coordinate } from "../../../../type";

// Define a service using a base URL and expected endpoints
export const GlobelApi = createApi({
  tagTypes: ["Coords", "Data"], // Use "Coords" tag here for coordinates
  reducerPath: "Globel",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/Tree" }),
  endpoints: (builder) => ({
    getALL_coords: builder.mutation<Coordinate[], void>({
      query: () => ({
        url: `/All_coords`,
        method: "POST",
        body: JSON.stringify({}), // send an empty body
        headers: { "Content-Type": "application/json" }, // set headers for request
      }),
      invalidatesTags: ["Coords"], // "Coords" tag used here
    }),
    getAll_users: builder.mutation<All_Users[], void>({
      query: () => ({
        url: `/All_users`,
        method: "POST",
        body: "1",
      }),
      invalidatesTags: ["Coords"],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetALL_coordsMutation, useGetAll_usersMutation } = GlobelApi;
