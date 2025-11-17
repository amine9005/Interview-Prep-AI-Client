import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";

export const store = configureStore({ reducer: { authModal: modalReducer } });
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
