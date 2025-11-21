import { createSlice } from "@reduxjs/toolkit";
const storedUser = localStorage.getItem("User");
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("User", JSON.stringify(action.payload));
    },
    clearUser: (state, action) => {
      state.user = null;
      localStorage.removeItem("User");
      localStorage.removeItem("Token");
    },
  },
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
