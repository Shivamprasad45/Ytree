import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Featuers/Auth/AuthSlice"; // Adjust the import path as necessary
import treeReducer from "../Featuers/Resipe/TreeSlice"; // Adjust the import path as necessary

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    Trees: treeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
