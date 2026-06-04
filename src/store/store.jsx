import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../slices/notificationSlice";
import userReducer from "../slices/userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
  },
});
