import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
  explanationOpen: false,
  explanation: { title: "", explanation: "" },
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.explanationOpen = false;
      state.sidebarOpen = !state.sidebarOpen;
    },

    toggleOpenExplanation: (state) => {
      state.explanationOpen = !state.explanationOpen;
    },
    setExplanation: (state, action) => {
      state.explanation = action.payload;
    },
  },
});

export default sidebarSlice.reducer;
export const { toggleSidebar, toggleOpenExplanation, setExplanation } =
  sidebarSlice.actions;
