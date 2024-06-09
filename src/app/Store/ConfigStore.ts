import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Featuers/Auth/AuthSlice"; // Adjust the import path as necessary
import TreeSlice from "../Featuers/Tree/TreeSlice";

// Adjust the import path as necessary

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    Trees: TreeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
