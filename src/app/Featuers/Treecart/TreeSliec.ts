"use client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TreeCart } from "../../../../type";

interface State {
  Cartdata: TreeCart[] | null;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null; // Define error as string or null
}

const initialState: State = {
  Cartdata: [],
  status: "idle",
  error: null,
};

const TreeCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    Treecartdata(state, action: PayloadAction<TreeCart[]>) {
      state.Cartdata = action.payload;
    },
  },
});

export default TreeCartSlice.reducer;
export const { Treecartdata } = TreeCartSlice.actions;
// Define selectors here or in a separate file
export const cartDataSelector = (state: { cart: State }) =>
  state.cart.Cartdata;
