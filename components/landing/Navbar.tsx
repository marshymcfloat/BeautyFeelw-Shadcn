"use client";

import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { marketingModalAction } from "../slices/marketing/MarketingModalSlice";
export default function Navbar() {
  const dispatch = useDispatch();

  function showLogin() {
    dispatch(marketingModalAction.showLogin());
  }
  return (
    <nav className="absolute top-0 w-screen h-[5vh]  max-m-[50px]">
      <Button
        variant={"ghost"}
        onClick={showLogin}
        className="absolute top-1/2 underline -translate-y-1/2 right-0"
      >
        Login
      </Button>
    </nav>
  );
}
