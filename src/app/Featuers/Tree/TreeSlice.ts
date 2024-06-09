"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TreeInfo } from "../../../../type";
import { Plantsdetails } from "./TreeAPI";

interface State {
  PlantData: TreeInfo | null;

  // Use lowercase 'userData' for consistency
  status: "idle" | "pending" | "fulfilled";
  error: any | null; // Allow for different error types or null
}

const initialState: State = {
  PlantData: null,

  status: "idle",
  error: null,
};

export const PlantsdetailsAsync = createAsyncThunk(
  "auth/SignupApi", // More descriptive action name
  async (id) => {
    try {
      const response = await Plantsdetails(id);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const TreeSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PlantsdetailsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(PlantsdetailsAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        // Update userData based on backend response structure:

        state.PlantData = action.payload; // Assuming first element is the created user
      })
      .addCase(PlantsdetailsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export default TreeSlice.reducer;

export const TreeDetailSelector = (state: { Trees: State }) =>
  state.Trees.PlantData;
// No spread operator needed
