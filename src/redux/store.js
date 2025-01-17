import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./proflieSlice";

export const store = configureStore({
  reducer: {
    profiles: profileReducer,
  },
});
