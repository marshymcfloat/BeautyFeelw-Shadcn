"use client";

import {
  Dialog,
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
import CustomDateTimePicker from "@/components/ui/CustomDateAndTimerPicker";

export default function CashierModalPage() {
  const [serviceType, setServiceType] = useState("single");
  const [timeSelect, setTimeSelect] = useState("now");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataError, setDateError] = useState(false);
  const dispatch = useDispatch();

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
  }, [dispatch, selectedServices, totalDiscount]);

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

  async function handleSubmit() {
    if (!isFormValid || isSubmitting) return;
    setIsSubmitting(true);

    const data = await transactionSubmit({ ...transactionForm });

    console.log(data);

    if (data.success) {
      dispatch(transactionFormActions.resetState());
      dispatch(modalActions.hideCashier());
    }
    if (data.success === false && data.message === "Invalid date and time.") {
      setDateError(true);
    }

    setIsSubmitting(false);
  }

  return (
    <Dialog open>
      <DialogContent className="max-h-[820px] overflow-auto ">
        <DialogClose asChild>
          <button
            onClick={handleModalClosing}
            className="absolute right-2 top-2 rounded-full p-2 text-black"
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

          <div className="mb-4 flex justify-between">
            <div>
              <Label>Service Type</Label>
              <Select onValueChange={setServiceType} required>
                <SelectTrigger className="w-[180px] h-[50px] border-2 border-black">
                  <SelectValue placeholder="Single" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="set">Set</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Time</Label>
              <Select onValueChange={setTimeSelect} required>
                <SelectTrigger className="w-[180px] h-[50px] border-2 border-black">
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">Now</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {timeSelect === "other" && <CustomDateTimePicker error={dataError} />}

          <div className="mb-4">
            <ServicesSelect type={serviceType} />
          </div>

          <div className="flex mb-4 justify-between">
            <VoucherInput />
            <div>
              <Label>Payment Mode</Label>
              <Select required onValueChange={handlePaymentMethodChange}>
                <SelectTrigger className="w-[180px] h-[50px] border-2 border-black">
                  <SelectValue placeholder="Select Payment Mode" />
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
            <p>Sub Total: &#8369;{grandTotal + totalDiscount}</p>
            <p>Total Discount: &#8369;{totalDiscount}</p>
          </div>
          <p>Grand Total: &#8369;{grandTotal}</p>
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleModalClosing}
            className="border-2 border-black ml-auto hover:bg-black hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`border-2 border-black ${
              !isFormValid || isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-black hover:bg-white"
            }`}
          >
            {isSubmitting ? "Processing..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
