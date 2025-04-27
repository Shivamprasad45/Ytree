"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Coords,
  CustomSubscription,
  IPlantProfile,
  Plant_order,
} from "../../../../type";

// Adjust the import path as necessary

interface State {
  IPlantProfile: IPlantProfile[] | null;
  Coords: Coords | null;
  Order_before: Plant_order | null;
  Subcription: CustomSubscription | null;
  referred: any;
}

const initialState: State = {
  IPlantProfile: null,
  Coords: null,
  Order_before: null,
  Subcription: null,
  referred: null,
};

const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    MyTrees_Dis(state, action: PayloadAction<IPlantProfile[]>) {
      state.IPlantProfile = action.payload;
    },
    Use_current_location(state, action: PayloadAction<Coords>) {
      state.Coords = action.payload;
    },
    Plant_Order_before(state, action: PayloadAction<Plant_order>) {
      console.log(action.payload, "Use coords");
      state.Order_before = action.payload;
    },
    Allow_Notification(state, action: PayloadAction<CustomSubscription>) {
      console.log(action.payload, "Use coords");
      state.Subcription = action.payload;
    },
    setReferred(state, action: PayloadAction<any>) {
      state.referred = action.payload;
    },
  },
});

export default OrderSlice.reducer;
export const {
  MyTrees_Dis,
  Use_current_location,
  Plant_Order_before,
  Allow_Notification,
  setReferred,
} = OrderSlice.actions;

export const MyTreesSelector = (state: { order: State }) =>
  state.order.IPlantProfile;
export const Coords_Selector = (state: { order: State }) => state.order.Coords;
export const Before_PlantOrder_Selector = (state: { order: State }) =>
  state.order.Order_before;

export const Before_Plant_selector = (state: { order: State }) =>
  state.order.referred;
export const Allow_Notification_Endpoints_Selector = (state: {
  order: State;
}) => state.order.Subcription;
