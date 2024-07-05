import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Featuers/Auth/AuthSlice"; // Adjust the import path as necessary
import TreeSlice from "../Featuers/Tree/TreeSlice";
import TreeCart from "../Featuers/Treecart/TreeSliec";
import { CartApi } from "../Featuers/Treecart/TreeServicesAPI";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthApi } from "../Featuers/Auth/AuthAPIS";
import { TreeApi } from "../Featuers/Tree/TreeServices";
import { TreeOrder_API } from "../Featuers/TreeOrder/TreeOrderServices";
import TreeOrderSlice from "../Featuers/TreeOrder/TreeOrderSlice";

// Adjust the import path as necessary

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    Trees: TreeSlice,
    cart: TreeCart,
    order: TreeOrderSlice,
    // Add the generated reducer as a specific top-level slice
    [CartApi.reducerPath]: CartApi.reducer,
    [TreeApi.reducerPath]: TreeApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [TreeOrder_API.reducerPath]: TreeOrder_API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      CartApi.middleware,
      AuthApi.middleware,
      TreeApi.middleware,
      TreeOrder_API.middleware
    ),
});
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
