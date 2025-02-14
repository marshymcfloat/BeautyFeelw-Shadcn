"use server";

import Service from "@/lib/models/Service";
import Set from "@/lib/models/Set";
import Voucher from "@/lib/models/Voucher";
import Transaction from "@/lib/models/Transaction";
import { connectDatabase } from "./models/Customer";
import {
  formalizeName,
  checkCustomer,
} from "./helper functions/submittingTransaction";
type voucherData = {
  status: string;
  value?: number;
};

export async function getServices(type: string) {
  try {
    await connectDatabase();

    let data;
    if (type === "single") {
      data = await Service.find({}).lean();
    } else if (type === "set") {
      data = await Set.find({}).lean();
    } else {
      return JSON.stringify({ error: "Invalid type" });
    }

    return JSON.stringify({ data });
  } catch (error) {
    console.error("Database error:", error);
    return JSON.stringify({ error: "Failed to fetch services" });
  }
}

export async function voucherValidity(code: string): Promise<voucherData> {
  const foundCode = await Voucher.findOne({ code });

  if (foundCode) {
    return { status: "valid", value: foundCode.value };
  } else {
    return { status: "invalid" };
  }
}
export async function transactionSubmit(formData: any) {
  if (!formData) {
    console.error("Error: No data submitted.");
    return { success: false, message: "No data submitted." };
  }

  const { name, paymentMethod, services, grandTotal } = formData;

  if (
    !name ||
    !paymentMethod ||
    !Array.isArray(services) ||
    services.length === 0 ||
    grandTotal <= 0
  ) {
    console.error("Error: Invalid form data.", formData);
    return {
      success: false,
      message:
        "Please complete all required fields and ensure grand total is greater than zero.",
    };
  }

  try {
    const newName: string = formalizeName(name);

    // Ensure each service has a `checkedBy` field set to `null`
    const servicesWithCheckedBy = services.map((service) => ({
      ...service,
      checkedBy: null, // Explicitly set checkedBy to null
    }));

    const newTransaction = new Transaction({
      name: newName,
      services: servicesWithCheckedBy, // Use the updated services array
      paymentMethod,
      grandTotal,
    });

    await newTransaction.save();

    await checkCustomer(newName, newTransaction);

    return { success: true, message: "Transaction successfully saved." };
  } catch (error) {
    console.error("Error saving transaction:", error);
    return { success: false, message: "Failed to save transaction." };
  }
}
