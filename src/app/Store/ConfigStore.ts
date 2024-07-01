import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Featuers/Auth/AuthSlice"; // Adjust the import path as necessary
import TreeSlice from "../Featuers/Tree/TreeSlice";
import TreeCart from "../Featuers/Treecart/TreeSliec";
import { CartApi } from "../Featuers/Treecart/TreeAPi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthApi } from "../Featuers/Auth/AuthAPIS";
import { TreeApi } from "../Featuers/Tree/TreeServices";
// Adjust the import path as necessary

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    Trees: TreeSlice,
    cart: TreeCart,
    // Add the generated reducer as a specific top-level slice
    [CartApi.reducerPath]: CartApi.reducer,
    [TreeApi.reducerPath]: TreeApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      CartApi.middleware,
      AuthApi.middleware,
      TreeApi.middleware
    ),
});
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
