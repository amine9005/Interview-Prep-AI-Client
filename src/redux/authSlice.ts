import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../api/api";
import { apiPaths } from "../utils/apiPaths";
import type { UserProfile } from "../types/types";

type windowSates = "Login" | "SignUp" | "Closed" | "CreateSession";

const modalState: windowSates = "Closed";

const token = Cookies.get("token");

// console.log("token: ", token);

interface initialStateType {
  modalState: windowSates;
  success: boolean;
  user: UserProfile | null;
  rememberMe: boolean;
  token: string | null;
  profileImage: string | null;
}

const initialState: initialStateType = {
  modalState,
  success: false,
  user: null,
  rememberMe: false,
  token: null,
  profileImage: null,
};

const clear_user = (state: initialStateType) => {
  state.user = null;
  state.success = false;
  state.rememberMe = false;
  state.token = null;
  state.profileImage = null;
  Cookies.remove("token");
};

if (token) {
  try {
    const response = await api.get(apiPaths.AUTH.GET_PROFILE);

    const { success, user } = response.data;

    if (success) {
      initialState.user = user;
      initialState.profileImage = user.profileImageURL;
      initialState.success = success;
      initialState.modalState = "Closed";
      initialState.token = token;
    }
  } catch (error) {
    console.log(error);
  }
  // console.log("initialState: ", initialState);
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthModal: (state, action) => {
      if (state.success) {
        if (action.payload === "CreateSession") {
          state.modalState = "CreateSession";
          return;
        }
        state.modalState = "Closed";
        return;
      }
      state.modalState = action.payload;
    },
    Logout: (state) => {
      clear_user(state);
    },
    setUser: (state, payload) => {
      if (payload.payload.success) {
        state.user = payload.payload.user;
        state.profileImage = payload.payload.user.profileImageURL;
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
        clear_user(state);
      }
    },
  },
});

export default authSlice.reducer;
export const { setAuthModal, setUser, Logout } = authSlice.actions;
