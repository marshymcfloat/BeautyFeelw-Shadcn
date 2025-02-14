"use client";

import { voucherValidity } from "@/lib/serverActions";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { transactionFormActions } from "../slices/TransactionFormSlice";

export default function VoucherInput() {
  const [input, setInput] = useState("");
  const [valid, setValid] = useState(false);
  const [checked, setChecked] = useState(false); // New state to track validation status
  const dispatch = useDispatch();

  useEffect(() => {
    if (!input) {
      setChecked(false);
      dispatch(transactionFormActions.setDiscount(0));
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const data = await voucherValidity(input);
        dispatch(
          transactionFormActions.setDiscount(
            data.status === "valid" ? data.value : 0
          )
        );
        data.status === "valid"
          ? dispatch(transactionFormActions.setVoucherCode(input))
          : dispatch(transactionFormActions.setVoucherCode(""));
        setValid(data.status === "valid");
        setChecked(true);
      } catch (error) {
        console.error(error instanceof Error ? error.message : error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input, dispatch]);

  function handleInputChanges(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value.toUpperCase());
  }

  return (
    <div className="">
      <Label>Voucher</Label>
      <Input
        onChange={handleInputChanges}
        value={input}
        placeholder="Voucher Code"
        className={`h-[50px] max-w-[180px] border-2 border-black rounded-md ${
          checked
            ? valid
              ? "border-green-500 text-green-500"
              : "border-red-500 text-red-500"
            : ""
        }`}
      />
    </div>
  );
}
