"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CustomerInputSearch from "@/components/input fields/CustomerInputSearch";
import ServicesSelect from "@/components/input fields/ServicesSelect";
import VoucherInput from "@/components/input fields/VoucherInput";
import SelectedService from "@/components/ui/SelectedService";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "@/components/slices/ModalSlice";
import { RootState } from "@/components/providers/ReduxProvider";
import { transactionFormActions } from "@/components/slices/TransactionFormSlice";
import { transactionSubmit } from "@/lib/serverActions";

export default function CashierModalPage() {
  const [serviceType, setServiceType] = useState("single");

  const dispatch = useDispatch();
  const form = useForm();

  const selectedServices =
    useSelector((state: RootState) => state.transactionForm.services) || [];

  const grandTotal = useSelector(
    (state: RootState) => state.transactionForm.grandTotal
  );

  const totalDiscount = useSelector(
    (state: RootState) => state.transactionForm.totalDiscount
  );

  const transactionForm = useSelector(
    (state: RootState) => state.transactionForm
  );

  useEffect(() => {
    dispatch(transactionFormActions.setTotal());
  }, [selectedServices, totalDiscount]);

  function handleModalClosing() {
    dispatch(modalActions.hideCashier());
  }

  function handlePaymentMethodChange(method: string) {
    dispatch(transactionFormActions.setPaymentMethod(method));
  }

  const isFormValid = useMemo(() => {
    return (
      transactionForm.grandTotal > 0 &&
      transactionForm.name.trim() !== "" &&
      transactionForm.paymentMethod.trim() !== "" &&
      transactionForm.services.length > 0
    );
  }, [transactionForm]);

  return (
    <Dialog open>
      <DialogContent>
        <DialogClose asChild>
          <button
            onClick={handleModalClosing}
            className="absolute right-2 top-2 rounded-full p-2 text-black "
          >
            ✕
          </button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="text-center text-2xl tracking-widest">
            BeautyFeel
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-hidden">
          <CustomerInputSearch />
          <div className="mb-4">
            <Label>Service Type</Label>
            <Select onValueChange={setServiceType} required>
              <SelectTrigger className="w-[45%] h-[50px] border-2 border-black">
                <SelectValue placeholder="Single" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="set">Set</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <ServicesSelect type={serviceType} />
          </div>
          <div className="flex mb-4 justify-between">
            <VoucherInput />
            <div className="">
              <Label>Payment Mode</Label>
              <Select required onValueChange={handlePaymentMethodChange}>
                <SelectTrigger className="w-[180px] h-[50px] border-2 border-black">
                  <SelectValue placeholder="Please Select Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="ewallet">E-Wallet</SelectItem>
                  <SelectItem value="bank">Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="h-[20vh] px-4 rounded-md overflow-y-auto p-2 max-h-[500px] bg-slate-300">
            {selectedServices.length > 0 ? (
              selectedServices.map((service) => (
                <SelectedService
                  key={service.name}
                  name={service.name}
                  quantity={service.quantity}
                  price={service.price}
                />
              ))
            ) : (
              <div className="h-full flex justify-center items-center">
                <h1 className="text-xl font-bold tracking-widest">
                  No Services Selected
                </h1>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <div className="flex text-md justify-between">
            <p className="">Sub Total: &#8369;{grandTotal + totalDiscount}</p>
            <p>Total Discount: &#8369;{totalDiscount}</p>
          </div>
          <div className="">
            <p>Grand Total: &#8369;{grandTotal}</p>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant={"outline"}
            onClick={handleModalClosing}
            className="border-2 border-black ml-auto hover:bg-black hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() =>
              transactionSubmit(transactionForm).then((data) => {
                data.success && dispatch(transactionFormActions.resetState());
                dispatch(modalActions.hideCashier());
              })
            }
            disabled={!isFormValid}
            className={`border-2 border-black ${
              !isFormValid
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-black hover:bg-white"
            }`}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
