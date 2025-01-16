import { configureStore } from "@reduxjs/toolkit";
import cardDataReducer from "../Slice/cardDataSlice";

export const store = configureStore({
  reducer: {
    cardData: cardDataReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
