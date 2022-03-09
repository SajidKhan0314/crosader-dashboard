import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: null,
  error: null,
  isLoading: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducer: {
    addProject(state, action) {},
    removeProject(state, action) {},
  },
  extraReducers: (builder) => {},
});

export const { addProject } = projectSlice.actions;
export default projectSlice.reducer;
