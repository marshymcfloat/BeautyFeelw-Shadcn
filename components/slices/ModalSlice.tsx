import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cashierModal: false,
  workModal: false,
  logOutModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showCashier(state) {
      state.cashierModal = true;
    },
    hideCashier(state) {
      state.cashierModal = false;
    },
    showWork(state) {
      state.workModal = true;
    },
    hideWork(state) {
      state.workModal = false;
    },
  },
});

export const modalActions = modalSlice.actions;
