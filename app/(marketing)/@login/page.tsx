"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { ChangeEvent, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import TextField from "@mui/material/TextField";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { marketingModalAction } from "@/components/slices/marketing/MarketingModalSlice";
import { Login } from "@/lib/serverActions";
import { useRouter } from "next/navigation";
export default function LoginDialogPage() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  function handleChanges(
    identifier: "username" | "password",
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setCredentials((prev) => ({
      ...prev,
      [identifier]: e.target.value,
    }));
  }
  function handleSubmission() {
    Login(credentials).then((data) => {
      if (!data) {
        return;
      }

      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      if (parsedData.status === 200) {
        router.push(`/${parsedData._id}`);
      } else {
        console.error("Login failed:", parsedData.message);
      }
    });
  }

  const dispatch = useDispatch();

  return (
    <>
      <Dialog open>
        <DialogContent className="border-2 border-customBlack max-w-[500px] min-h-[400px] bg-customOffWhite">
          <DialogClose asChild>
            <button
              onClick={() => {
                dispatch(marketingModalAction.hideLogin());
              }}
              className="absolute right-2 top-2 rounded-full p-2 text-black"
            >
              ✕
            </button>
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="absolute top-[50px] left-1/2 -translate-x-1/2 tracking-widest uppercase font-bold text-2xl">
              login
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col justify-around gap-4 mt-8">
            <div className="w-[80%] mx-auto">
              <TextField
                variant="outlined"
                label="Username"
                className="w-full"
                value={credentials.username}
                onChange={(e) => handleChanges("username", e)}
              />
            </div>
            <div className="w-[80%] mx-auto">
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                className="w-full"
                value={credentials.password}
                onChange={(e) => handleChanges("password", e)}
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Button
              onClick={handleSubmission}
              className="min-w-[100px]  border-2 border-customBlack hover:bg-transparent hover:text-customBlack"
            >
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
