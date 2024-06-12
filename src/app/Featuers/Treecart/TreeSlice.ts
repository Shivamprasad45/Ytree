// "use client";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { TreeInfo } from "../../../../type";
// import { Plantsdetails } from "./TreeAPI";

// interface State {
//   UserPlantData: TreeInfo | null;

//   // Use lowercase 'userData' for consistency
//   status: "idle" | "pending" | "fulfilled";
//   error: any | null; // Allow for different error types or null
// }

// const initialState: State = {
//   UserPlantData: null,

//   status: "idle",
//   error: null,
// };

// export const signupUserAsync = createAsyncThunk(
//   "auth/SignupApi", // More descriptive action name
//   async (id) => {
//     try {
//       const response = await Plantsdetails(id);
//       return response;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }
// );

// const AuthSlice = createSlice({
//   name: "Auth",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUserAsync.pending, (state) => {
//         state.status = "pending";
//       })
//       .addCase(signupUserAsync.fulfilled, (state, action) => {
//         state.status = "fulfilled";
//         // Update userData based on backend response structure:

//         state.PlantData = action.payload; // Assuming first element is the created user
//       })
//       .addCase(signupUserAsync.rejected, (state, action) => {
//         state.status = "idle";
//         state.error = action.error;
//       });
//   },
// });

// export default AuthSlice.reducer;

// export const userSelector = (state: { Auth: State }) =>
//   state.Auth.UserPlantData;
// // No spread operator needed
