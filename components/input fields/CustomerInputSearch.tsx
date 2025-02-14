"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { transactionFormActions } from "../slices/TransactionFormSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../providers/ReduxProvider";
import { usePathname } from "next/navigation";
import axios from "axios";

type Suggestion = {
  _id: string;
  name: string;
};

export default function CustomerInputSearch() {
  const [suggestionVisible, setSuggestionVisible] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const containerRef = useRef<HTMLDivElement>(null); // Reference for click-away detection
  const debounceRef = useRef<NodeJS.Timeout | null>(null); // Reference for debounce timeout

  const dispatch = useDispatch();
  const pathName = usePathname();

  const segments = pathName.split("/");
  const accountID = segments[1];

  const customerName = useSelector(
    (state: RootState) => state.transactionForm.name
  );

  function handleInputChanges(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    dispatch(transactionFormActions.setCustomerName(inputValue));

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (inputValue.trim() !== "") {
      debounceRef.current = setTimeout(() => {
        axios
          .get(
            `/api/${accountID}/cashier?customerName=${encodeURIComponent(
              inputValue
            )}`
          )
          .then((response) => {
            if (response.data.customers) {
              setSuggestions(response.data.customers);
              setSuggestionVisible(true);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }, 300);
    } else {
      setSuggestionVisible(false);
    }
  }

  function handleSelectingSuggestion(name: string) {
    dispatch(transactionFormActions.setCustomerName(name));
    setSuggestionVisible(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSuggestionVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full mb-4" ref={containerRef}>
      <Label htmlFor="customerName" className="text-lg font-medium">
        Name
      </Label>
      <Input
        type="text"
        value={customerName}
        onChange={handleInputChanges}
        id="customerName"
        className="h-[50px] border-2 border-black focus:border-black focus:ring-1 focus:ring-black text-lg px-3 rounded-lg transition-all duration-200"
        placeholder="Customer Name"
      />
      {suggestionVisible && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-20">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <div
                key={suggestion._id}
                onClick={() => handleSelectingSuggestion(suggestion.name)}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer transition-all"
              >
                {suggestion.name}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No Customer Found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
