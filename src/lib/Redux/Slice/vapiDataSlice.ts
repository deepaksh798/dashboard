import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userData {
  userDetails: string[];
}

const initialState: userData = {
  userDetails: [], // Initial empty array
};

export const logSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    storeUserData: (state, action: PayloadAction<string[]>) => {
      console.log("payload", action.payload);
      state.userDetails = action.payload;
    },
    clearLogs: (state) => {
      state.userDetails = [];
    },
  },
});

export const { storeUserData, clearLogs } = logSlice.actions;
export default logSlice.reducer;
