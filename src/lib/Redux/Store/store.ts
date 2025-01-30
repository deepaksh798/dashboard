import { configureStore } from "@reduxjs/toolkit";
import cardDataReducer from "../Slice/cardDataSlice";
import vapiiDataSlice from "../Slice/vapiDataSlice";

export const store = configureStore({
  reducer: {
    cardData: cardDataReducer,
    vapiCustomerData: vapiiDataSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
