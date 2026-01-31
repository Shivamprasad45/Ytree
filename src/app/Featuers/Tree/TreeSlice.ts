import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TreeInfo } from "../../../type";
import { Plantsdetails } from "./TreeAPI";

interface State {
  PlantData: TreeInfo | null;
  status: "idle" | "pending" | "fulfilled";
  error: any | null;
}

const initialState: State = {
  PlantData: null,
  status: "idle",
  error: null,
};

export const fetchPlantDetails = createAsyncThunk(
  "auth/LoginApi",
  async (id: string) => {
    try {
      const response = await Plantsdetails(id);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const treeSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlantDetails.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPlantDetails.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.PlantData = action.payload;
      })
      .addCase(fetchPlantDetails.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export default treeSlice.reducer;

export const TreeDetailSelector = (state: { Trees: State }) =>
  state.Trees.PlantData;
