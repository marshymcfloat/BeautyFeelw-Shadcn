"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionFormActions } from "../slices/TransactionFormSlice";
import { RootState } from "../providers/ReduxProvider";

export default function CustomDateTimePicker({ error }: { error: boolean }) {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false); // State to control error display

  const date = useSelector((state: RootState) => state.transactionForm.date);
  const time = useSelector((state: RootState) => state.transactionForm.time);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(transactionFormActions.setDate(e.target.value));
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(transactionFormActions.setTime(e.target.value));
  };

  useEffect(() => {
    if (error) {
      setShowError(true); // Show error message
      const timer = setTimeout(() => {
        setShowError(false); // Hide error message after 5 seconds
      }, 10000);

      return () => clearTimeout(timer); // Cleanup timer on unmount or error change
    }
  }, [error]);

  return (
    <div className="bg-white rounded-lg">
      <div className="space-y-4">
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${
              showError ? "text-red-500" : "text-black"
            }`}
          >
            {showError ? "Invalid Date/Time" : "Date"}
          </label>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className={`w-full p-2 border-2 rounded-md ${
              showError ? "border-red-500" : "border-customBlack"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time</label>
          <input
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="w-full p-2 border-2 border-customBlack rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
