import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("accessToken") ?? null,
  },
  reducers: {
    setUserCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.token = null;
    },
  },
});

export const { setUserCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: any) => state.auth.token;
