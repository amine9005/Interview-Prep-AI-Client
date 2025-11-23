import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sidebarSlice from "./sidebarSlice";

export const store = configureStore({
  reducer: { auth: authReducer, sidebar: sidebarSlice },
});
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
