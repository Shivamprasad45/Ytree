// "use client";
// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { IPlantProfile } from "../../../../type";

// // Adjust the import path as necessary

// interface State {
//   IPlantProfile: IPlantProfile[] | null;
// }

// const initialState: State = {
//   IPlantProfile: null,
// };

// const OrderSlice = createSlice({
//   name: "Order",
//   initialState,
//   reducers: {
//     MyTrees_Dis(state, action: PayloadAction<IPlantProfile[]>) {
//       state.IPlantProfile = action.payload;
//     },
//   },
// });

// export default OrderSlice.reducer;
// export const { MyTrees_Dis } = OrderSlice.actions;

// export const MyTreesSelector = (state: { order: State }) =>
//   state.order.IPlantProfile;
