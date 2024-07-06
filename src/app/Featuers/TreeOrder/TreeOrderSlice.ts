"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Coords, IPlantProfile } from "../../../../type";

// Adjust the import path as necessary

interface State {
  IPlantProfile: IPlantProfile[] | null;
  Coords: Coords | null;
}

const initialState: State = {
  IPlantProfile: null,
  Coords: null,
};

const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    MyTrees_Dis(state, action: PayloadAction<IPlantProfile[]>) {
      state.IPlantProfile = action.payload;
    },
    Use_current_location(state, action: PayloadAction<Coords>) {
      console.log(action.payload, "Use coords");
      state.Coords = action.payload;
    },
  },
});

export default OrderSlice.reducer;
export const { MyTrees_Dis, Use_current_location } = OrderSlice.actions;

export const MyTreesSelector = (state: { order: State }) =>
  state.order.IPlantProfile;
export const Coords_Selector = (state: { order: State }) => state.order.Coords;
