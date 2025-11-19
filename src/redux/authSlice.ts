import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../api/api";
import { apiPaths } from "../utils/apiPaths";

type windowSates = "Login" | "SignUp" | "Closed";

const modalState: windowSates = "Closed";

const token = Cookies.get("token");

interface initialStateType {
  modalState: windowSates;
  success: boolean;
  user: object;
  rememberMe: boolean;
  token: string | null;
}

const initialState: initialStateType = {
  modalState,
  success: false,
  user: {},
  rememberMe: false,
  token: null,
};

if (token) {
  try {
    const response = await api.post(apiPaths.AUTH.GET_PROFILE, {});

    const { success, user } = response.data;
    if (success) {
      initialState.user = user;
      initialState.success = success;
      initialState.modalState = "Closed";
      initialState.token = token;
    }
  } catch (error) {
    console.log(error);
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthModal: (state, action) => {
      if (state.success) {
        state.modalState = "Closed";
        return;
      }
      state.modalState = action.payload;
    },
    Logout: (state) => {
      state.user = {};
      state.success = false;
      state.rememberMe = false;
      state.token = null;
      Cookies.remove("token");
    },
    setUser: (state, payload) => {
      if (payload.payload.success) {
        state.user = payload.payload.user;
        state.modalState = "Closed";
        state.success = true;
        state.token = payload.payload.token;
        if (payload.payload.rememberMe) {
          Cookies.set("token", payload.payload.token, {
            expires: 7,
            secure: true,
            sameSite: "strict",
          });
        } else {
          Cookies.set("token", payload.payload.token, {
            secure: true,
            sameSite: "strict",
          });
        }
      } else {
        state.user = {};
        state.success = false;
        state.rememberMe = false;
        state.token = null;
        Cookies.remove("token");
      }
    },
  },
});

export default authSlice.reducer;
export const { setAuthModal, setUser } = authSlice.actions;
