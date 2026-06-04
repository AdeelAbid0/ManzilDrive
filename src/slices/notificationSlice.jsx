import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [], // multiple notifications
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      const newNotification = {
        id: Date.now(), // unique id
        message: action.payload.message,
        status: action.payload.status,
      };
      state.notifications.push(newNotification);
    },
    clearNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload, // remove by id
      );
    },
  },
});

export const { showNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
