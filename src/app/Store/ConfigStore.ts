import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Featuers/Auth/AuthSlice";
import TreeSlice from "../Featuers/Resipe/TreeSlice";

export const store = configureStore({
  reducer: {
    Auth: AuthSlice,
    Trees: TreeSlice,
  },
});
