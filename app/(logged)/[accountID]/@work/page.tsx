"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ChevronLeft } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import ServiceAvailed from "@/components/ui/ServiceAvailed";
import { useDispatch } from "react-redux";
import { modalActions } from "@/components/slices/ModalSlice";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

interface servicesProps {
  name: string;
  price: number;
  quantity: number;
  servedBy: string;
  checkedBy: string | null; // Add this field
}

interface WorkEntry {
  _id: string;
  date: string;
  services: servicesProps[];
  name: string;
  status: string;
}

export default function WorkPage() {
  const [data, setData] = useState<WorkEntry[]>([]);
  const [selected, setSelected] = useState<WorkEntry | null>(null);
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();
  const pathName = usePathname();

  const segments = pathName.split("/");
  const accountID = segments[1];

  const inputCheck = inputRef.current ? inputRef.current.checked : false;

  console.log(inputCheck);

  useEffect(() => {
    if (!accountID) return;

    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: WorkEntry[] }>(
          `/api/${accountID}/work`
        );
        setData(response.data?.data || []);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", (error as Error).message);
      }
    };

    fetchData();
  }, [pathName]);

  function handleModalClosing() {
    dispatch(modalActions.hideWork());
  }

  function handleBacking() {
    setSelected(null);
  }

  useEffect(() => {
    const socketInstance = io("http://localhost:4000");

    socketInstance.on("connect", () => {
      console.log("Connected to socket server");
    });

    // Listen for service updates
    socketInstance.on("serviceUpdated", (data) => {
      console.log("Service updated:", data);

      // Update the selected transaction's services
      if (selected && selected._id === data.transactionID) {
        const updatedServices = selected.services.map((service) => {
          if (service.name === data.service) {
            return {
              ...service,
              servedBy: data.servedBy,
              checkedBy: data.checkedBy, // Update checkedBy
            };
          }
          return service;
        });

        setSelected({
          ...selected,
          services: updatedServices,
        });
      }
    });

    socketInstance.on("error", (error) => {
      console.error("Socket error:", error);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [selected]);

  function handleSelecting(service: string, checked: boolean) {
    console.log("Selecting service:", service, checked);
    if (socket) {
      socket.emit("selectService", {
        transactionID: selected?._id,
        service,
        user: accountID,
        checked,
      });
    } else {
      console.error("Socket is not connected");
    }
  }

  return (
    <>
      {!selected && (
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
              <DialogTitle className="text-center text-xl font-bold tracking-widest">
                BeautyFeel
              </DialogTitle>
            </DialogHeader>
            <div className="border-2 border-black rounded-md p-2">
              <Table className="max-w-full">
                <TableHeader className="border-0">
                  <TableRow>
                    <TableHead className="w-1/3">Date</TableHead>
                    <TableHead className="w-1/3 text-center">Name</TableHead>
                    <TableHead className="w-1/3 text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.length > 0 ? (
                    data.map((transaction) => (
                      <TableRow
                        key={transaction._id}
                        className="border-b-2 border-black cursor-pointer "
                        onClick={() => setSelected(transaction)}
                      >
                        <TableCell>
                          {transaction.date
                            ? new Date(transaction.date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                }
                              )
                            : "N/A"}
                        </TableCell>
                        <TableCell className="truncate">
                          {transaction.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {transaction.status}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {selected && (
        <Dialog open>
          <DialogContent>
            <button onClick={handleBacking}>
              <ChevronLeft />
            </button>
            <DialogClose asChild>
              <button
                onClick={handleModalClosing}
                className="absolute right-2 top-2 rounded-full p-2 text-black "
              >
                ✕
              </button>
            </DialogClose>
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold tracking-widest">
                BeautyFeel
              </DialogTitle>
              <DialogDescription className="flex justify-between">
                <span>
                  {" "}
                  {selected.date
                    ? new Date(selected.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })
                    : "N/A"}
                </span>
                <span>{selected.name}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="border-2 p-2 border-black rounded-md">
              {selected.services.map((service) => (
                <ServiceAvailed
                  key={service.name}
                  name={service.name}
                  onSelect={handleSelecting}
                  servedBy={service.servedBy}
                  checkedBy={service.checkedBy} // Pass checkedBy
                  currentUser={accountID} // Pass current user ID
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
