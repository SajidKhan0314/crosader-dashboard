import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./project";

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
});
