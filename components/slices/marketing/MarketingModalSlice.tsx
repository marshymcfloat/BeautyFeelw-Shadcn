import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginModal: false,
};

export const marketingModalSlice = createSlice({
  name: "marketing modal",
  initialState,
  reducers: {
    showLogin(state) {
      state.loginModal = true;
    },
    hideLogin(state) {
      state.loginModal = false;
    },
  },
});

export const marketingModalAction = marketingModalSlice.actions;
