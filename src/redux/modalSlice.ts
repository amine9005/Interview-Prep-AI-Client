import { createSlice } from "@reduxjs/toolkit";

type windowSates = "Login" | "SignUp" | "Closed";

const modalState: windowSates = "Closed";

const initialState = {
  modalState,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setAuthModal: (state, action) => {
      state.modalState = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { setAuthModal } = modalSlice.actions;
