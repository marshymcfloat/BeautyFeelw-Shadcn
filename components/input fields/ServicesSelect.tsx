"use client";

type ServiceAttributes = {
  name: string;
  quantity: number;
  price: number;
};

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { getServices } from "@/lib/serverActions";
import { useDispatch, useSelector } from "react-redux";
import { transactionFormActions } from "../slices/TransactionFormSlice";
import { RootState } from "../providers/ReduxProvider";

export default function ServicesSelect({ type }: { type: string }) {
  const [services, setServices] = useState([]);

  const dispatch = useDispatch();

  const selectedServices = useSelector(
    (state: RootState) => state.transactionForm.services
  );

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await getServices(type);
        const result = JSON.parse(response);

        if (result.data) {
          setServices(result.data);
        } else {
          console.error("Error fetching services:", result.error);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    }

    fetchServices();
  }, [type]);

  function handleSelectingService(serviceString: string) {
    const service: ServiceAttributes = JSON.parse(serviceString);
    dispatch(
      transactionFormActions.setAvailedServices({
        name: service.name,
        quantity: 1,
        price: service.price,
      })
    );
  }

  return (
    <div>
      <Label>Services</Label>
      <Select onValueChange={handleSelectingService}>
        <SelectTrigger className="w-full h-[50px] border-2 border-black">
          <SelectValue placeholder="Select Services" />
        </SelectTrigger>
        <SelectContent>
          {services.map((service: any) => (
            <SelectItem
              key={service._id}
              className={
                selectedServices.find(
                  (selectedService) => service.name === selectedService.name
                ) && "bg-green-300 hover:bg-green-300"
              }
              value={JSON.stringify(service)}
            >
              {service.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
