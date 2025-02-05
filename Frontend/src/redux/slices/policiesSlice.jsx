import { createSlice } from "@reduxjs/toolkit";

const policiesSlice = createSlice({
  name: "policies",
  initialState: {
    selectedPolicy: null, // Only one policy can be selected at a time
  },
  reducers: {
    setPolicy: (state, action) => {
      state.selectedPolicy = action.payload; // Replaces the existing policy
    },
    clearPolicy: (state) => {
      state.selectedPolicy = null; // Clears the selection
    },
  },
});

export const { setPolicy, clearPolicy } = policiesSlice.actions;
export default policiesSlice.reducer;
