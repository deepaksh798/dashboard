import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface cardDataState {
  data: Array<{
    id: number;
    name: string;
    followers: number;
    address: string;
    lifestyle: string;
    advertisingPrice: number;
  }>;
  loading: boolean;
  error: string | null;
}

const initialState: cardDataState = {
  data: [],
  loading: false,
  error: null,
};

//Async thunk
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get("/data.json");
  console.log("data => ", response);
  return response.data;
});

const cardDataSlice = createSlice({
  name: "cardData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

// export const { increment, decrement, setValue } = exampleSlice.actions;
export default cardDataSlice.reducer;
