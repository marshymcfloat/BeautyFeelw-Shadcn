"use client";

import { useDispatch } from "react-redux";
import { transactionFormActions } from "../slices/TransactionFormSlice";

export default function SelectedService({
  quantity,
  name,
  price,
}: {
  quantity: number;
  name: string;
  price: number;
}) {
  const dispatch = useDispatch();

  function handleQuantityChanges(identifier: string) {
    dispatch(transactionFormActions.setServiceQuantity({ identifier, name }));
  }

  return (
    <div className="rounded-lg my-2 shadow-md flex items-center bg-gray-100 min-h-[60px] p-2">
      <div className="w-[10%] text-center">{quantity}x</div>
      <div className="w-[50%] flex flex-col">
        <h1 className="truncate font-bold">{name}</h1>
        <p className="text-[12px]">&#8369;{price}</p>
      </div>
      <div className="w-[30%]  flex gap-2 justify-center">
        <button
          onClick={() => handleQuantityChanges("dec")}
          className="size-6  border-2 rounded-md flex items-center justify-center border-black"
        >
          -
        </button>
        <button
          onClick={() => handleQuantityChanges("inc")}
          className="size-6 border-2 bg-black text-white rounded-md flex items-center justify-center border-black"
        >
          +
        </button>
      </div>
      <div className="w-[10%] ">&#8369;{quantity * price}</div>
    </div>
  );
}
