// services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { All_Users, Coordinate } from "../../../../type";

// Define a service using a base URL and expected endpoints
export const GlobelApi = createApi({
  tagTypes: ["Coords", "Data"], // Use "Coords" tag here for coordinates
  reducerPath: "Globel",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/Tree" }),
  endpoints: (builder) => ({
    getALL_coords: builder.query<Coordinate[], void>({
      query: () => `/All_coords`,
      providesTags: ["Coords"], // "Coords" tag used here
    }),

    getAll_users: builder.query<All_Users[], void>({
      query: () => ({
        url: `/All_users`,
      }),
      providesTags: ["Data"],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetALL_coordsQuery, useGetAll_usersQuery } = GlobelApi;
