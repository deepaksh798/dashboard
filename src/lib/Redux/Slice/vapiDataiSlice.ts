import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ApiState {
  loading: boolean;
  toolCalls: any[] | null; // Store the toolCalls array
  error: string | null;
}

const initialState: ApiState = {
  loading: false,
  toolCalls: null,
  error: null,
};

// Async thunk for POST API call
export const vapiPostData = createAsyncThunk(
  "api/postData",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://4d67-2401-4900-1ca3-c553-459-b6dc-510a-f602.ngrok-free.app/vapi-api",
        payload
      );
      console.log(response);
      const toolCalls = response.data?.message?.toolCalls || null; // Extract toolCalls

      return toolCalls;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Something went wrong with the API call"
      );
    }
  }
);

const vapiCustomerDetailsSlice = createSlice({
  name: "vapiCustomerData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(vapiPostData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.toolCalls = null;
      })
      .addCase(
        vapiPostData.fulfilled,
        (state, action: PayloadAction<any[] | null>) => {
          state.loading = false;
          state.toolCalls = action.payload;
        }
      )
      .addCase(vapiPostData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.toolCalls = null;
      });
  },
});

export default vapiCustomerDetailsSlice.reducer;
