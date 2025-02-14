"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Coins } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CashierDialog() {
  const formSchema = z.object({
    customerName: z
      .string()
      .min(2, {
        message: "Customer name should be at least 2 characters.",
      })
      .max(50, {
        message: "Customer name should not exceed 50 characters.",
      }),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger></DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center tracking-widest">
            BeautyFeel
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="customerName">Customer Name</label>
              <input
                id="customerName"
                placeholder="Enter customer name"
                {...form.register("customerName")}
              />
              {form.formState.errors.customerName && (
                <p>{form.formState.errors.customerName.message}</p>
              )}
            </div>

            <button type="submit">Submit</button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
