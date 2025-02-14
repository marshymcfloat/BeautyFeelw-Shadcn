import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { transactionFormSlice } from "../slices/TransactionFormSlice";
import { modalSlice } from "../slices/ModalSlice";
const store = configureStore({
  reducer: {
    transactionForm: transactionFormSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
