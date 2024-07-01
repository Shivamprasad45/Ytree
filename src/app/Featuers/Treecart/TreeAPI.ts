import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TreeCart, Update_Cart, UserMessage } from "../../../../type";
import { toast } from "sonner";
import { Treecartdata } from "./TreeSliec";
// Define a service using a base URL and expected endpoints
export const CartApi = createApi({
  reducerPath: "CartAPI",
  tagTypes: ["Cart"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api/Cart" }),
  endpoints: (builder) => ({
    getCartItemById: builder.query<TreeCart[], string>({
      query: (id) => `/Mycarttree?Id=${id}`,

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(Treecartdata(data));
        } catch (error) {}
      },
      providesTags: ["Cart"],
    }),
    AddCart: builder.mutation<UserMessage, TreeCart>({
      query: (Cart_data) => ({
        url: `/Addtree`,
        method: "POST",
        body: Cart_data,
      }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast(data.message);
        } catch (error: any) {
          toast(error.message);
        }
      },
    }),
    RemoveCart: builder.mutation<UserMessage, Update_Cart>({
      query: ({ _id, UserId, ...rest }) => ({
        url: `/Removetree?Id=${_id}&UserId=${UserId}`,
        method: "DELETE",
        body: rest,
      }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast(data.message);
        } catch (error: any) {
          toast(error.message);
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCartItemByIdQuery,
  useAddCartMutation,
  useRemoveCartMutation,
} = CartApi;
