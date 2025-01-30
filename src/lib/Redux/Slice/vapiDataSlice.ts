import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LogState {
  userDetails: string[];
}

const initialState: LogState = {
  userDetails: [], // Initial empty array
};

export const logSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addLogs: (state, action: PayloadAction<string[]>) => {
      console.log("payload", action.payload);
      state.userDetails = action.payload;
    },
    clearLogs: (state) => {
      state.userDetails = [];
    },
  },
});

export const { addLogs, clearLogs } = logSlice.actions;
export default logSlice.reducer;
