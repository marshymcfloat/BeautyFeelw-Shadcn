import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ServiceAttributes = {
  name: string;
  quantity: number;
  price: number;
};

type TransactionFormState = {
  name: string;
  services: ServiceAttributes[];
  paymentMethod: string;
  voucherCode: string;
  totalDiscount: number;
  grandTotal: number;
  time: string;
  date: string;
};

const initialState: TransactionFormState = {
  name: "",
  services: [],
  paymentMethod: "",
  voucherCode: "",
  totalDiscount: 0,
  grandTotal: 0,
  time: "",
  date: "",
};

export const transactionFormSlice = createSlice({
  name: "transaction form",
  initialState,
  reducers: {
    setCustomerName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAvailedServices(state, action: PayloadAction<ServiceAttributes>) {
      if (
        !state.services.find((service) => service.name === action.payload.name)
      ) {
        state.services.push(action.payload);
      } else {
        state.services = state.services.filter(
          (services) => services.name !== action.payload.name
        );
      }
    },
    setServiceQuantity(state, action) {
      const { identifier, name } = action.payload;

      const service = state.services.find((service) => service.name === name);

      if (!service) return;

      if (identifier === "inc") {
        service.quantity++;
      }

      if (identifier === "dec") {
        if (service.quantity > 1) {
          service.quantity--;
        } else {
          state.services = state.services.filter((s) => s.name !== name);
        }
      }
    },
    setTotal(state) {
      if (state.services.length > 0) {
        state.grandTotal =
          state.services.reduce((total, service) => {
            return total + service.quantity * service.price;
          }, 0) - state.totalDiscount;
      }
    },
    setDiscount(state, action) {
      state.totalDiscount = action.payload;
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
    },
    setVoucherCode(state, action) {
      state.voucherCode = action.payload;
    },
    setTime(state, action) {
      state.time = action.payload;
    },
    setDate(state, action) {
      state.date = action.payload;
    },
    resetState(state) {
      state.name = initialState.name;
      state.services = initialState.services;
      state.paymentMethod = initialState.paymentMethod;
      state.totalDiscount = initialState.totalDiscount;
      state.grandTotal = initialState.grandTotal;
      state.date = initialState.date;
      state.time = initialState.time;
    },
  },
});

export const transactionFormActions = transactionFormSlice.actions;
