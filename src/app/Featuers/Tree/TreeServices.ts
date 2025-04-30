// services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TreeInfo } from "../../../../type";

// Define a service using a base URL and expected endpoints
export const TreeApi = createApi({
  reducerPath: "TreeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getTreeInfo: builder.query<TreeInfo[], void>({
      query: () => `/TreeInfo`,
    }),
    getTreeDetails: builder.query<TreeInfo, string>({
      query: (id) => ({
        url: `/Tree/TreeDetails?id=${id}`,
      }),
    }),
    getlog_tree: builder.mutation<any, any>({
      query: (LogInfo) => ({
        url: `/Tree/Logtree`,
        body: LogInfo,
        method: "POST",
      }),
    }),
    All_leaders: builder.query<any, void>({
      query: () => ({
        url: `/leaderboard`,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTreeInfoQuery,
  useGetTreeDetailsQuery,
  useGetlog_treeMutation,
  useAll_leadersQuery,
} = TreeApi;
