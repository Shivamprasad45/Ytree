"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TreeCart } from "../../../type";
import { LocationData } from "@/lib/locationService";

interface State {
  Cartdata: TreeCart[] | null;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  Location: LocationData | null;
  error: string | null; // Define error as string or null
}

const initialState: State = {
  Cartdata: [],
  status: "idle",
  error: null,
  Location: null,
};

const TreeCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    Treecartdata(state, action: PayloadAction<TreeCart[]>) {
      state.Cartdata = action.payload;
    },
    Location_Current(state, action: PayloadAction<LocationData>) {
      state.Location = action.payload;
    },
  },
});

export default TreeCartSlice.reducer;
export const { Treecartdata, Location_Current } = TreeCartSlice.actions;
// Define selectors here or in a separate file
export const cartDataSelector = (state: { cart: State }) => state.cart.Cartdata;
export const LocationDataSelector = (state: { cart: State }) =>
  state.cart.Location;
