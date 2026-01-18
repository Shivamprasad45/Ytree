/* This code snippet is setting up a Redux store using Redux Toolkit in a TypeScript environment.
Here's a breakdown of what each part of the code is doing: */
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Featuers/Auth/AuthSlice"; // Adjust the import path as necessary
import TreeSlice from "../Featuers/Tree/TreeSlice";
import TreeCart from "../Featuers/Treecart/TreeSliec";
import BlogSlice from "../Featuers/Blog/BlogSlice";
import { CartApi } from "../Featuers/Treecart/TreeServicesAPI";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthApi } from "../Featuers/Auth/AuthAPIS";
import { TreeApi } from "../Featuers/Tree/TreeServices";
import { TreeOrder_API } from "../Featuers/TreeOrder/TreeOrderServices";
import TreeOrderSlice from "../Featuers/TreeOrder/TreeOrderSlice";
import { GlobelApi as GlobeApi } from "../Featuers/Global/GlobeServices";
import { BlogApi } from "../Featuers/Blog/BlogServices";
import { PartnershipApi } from "../Featuers/Partnership/PartnershipApi";

// Adjust the import path as necessary

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    Trees: TreeSlice,
    cart: TreeCart,
    order: TreeOrderSlice,
    blog: BlogSlice,
    // Add the generated reducer as a specific top-level slice
    [CartApi.reducerPath]: CartApi.reducer,
    [TreeApi.reducerPath]: TreeApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [GlobeApi.reducerPath]: GlobeApi.reducer,
    [TreeOrder_API.reducerPath]: TreeOrder_API.reducer,
    [BlogApi.reducerPath]: BlogApi.reducer,
    [PartnershipApi.reducerPath]: PartnershipApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      CartApi.middleware,
      AuthApi.middleware,
      TreeApi.middleware,
      TreeOrder_API.middleware,
      GlobeApi.middleware,
      BlogApi.middleware,
      PartnershipApi.middleware
      // Add any other middleware you want to use
    ),
});
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

