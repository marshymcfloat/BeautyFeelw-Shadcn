"use server";

import Service from "@/lib/models/Service";
import Set from "@/lib/models/Set";
import Voucher from "@/lib/models/Voucher";
import Transaction from "@/lib/models/Transaction";
import Account from "@/lib/models/Account";
import { connectDatabase } from "./models/Customer";
import bcrypt from "bcrypt";

import {
  formalizeName,
  checkCustomer,
} from "./helper functions/submittingTransaction";
type voucherData = {
  status: string;
  value?: number;
};

export async function getTransactionCount() {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const transactionCount = await Transaction.countDocuments({
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    return transactionCount;
  } catch (error) {
    console.error("Error fetching transaction count:", error);
    throw error;
  }
}
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

  if (foundCode && !foundCode.usedOn) {
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

  const { name, paymentMethod, voucherCode, services, grandTotal, date, time } =
    formData;

  const formmattedBookDateTime = new Date(`${date}T${time}`);

  if (formmattedBookDateTime < new Date()) {
    return { success: false, message: "Invalid date and time." };
  }

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

  if (voucherCode.trim() !== "") {
    const foundVoucher = await Voucher.findOne({ code: voucherCode });

    if (foundVoucher) {
      await Voucher.findByIdAndUpdate(foundVoucher._id, { usedOn: new Date() });
    }
  }

  try {
    const newName: string = formalizeName(name);

    const servicesWithCheckedBy = services.map((service) => ({
      ...service,
      checkedBy: null,
    }));

    const newTransaction = new Transaction({
      name: newName,
      services: servicesWithCheckedBy,
      paymentMethod,
      grandTotal,
      bookDateAndTime: formmattedBookDateTime,
    });

    await newTransaction.save();

    await checkCustomer(newName, newTransaction);

    return { success: true, message: "Transaction successfully saved." };
  } catch (error) {
    console.error("Error saving transaction:", error);
    return { success: false, message: "Failed to save transaction." };
  }
}

export async function Login(credentials: {
  username: string;
  password: string;
}) {
  const { username, password } = credentials;

  if (!username || !password) {
    return { status: 400, message: "Username and password are required" };
  }

  const account = await Account.findOne({ username });

  if (!account) {
    return { status: 404, message: "Account not found" };
  }

  const isPasswordValid = await bcrypt.compare(password, account.password);
  if (!isPasswordValid) {
    return { status: 401, message: "Invalid password" };
  }

  return JSON.stringify({
    status: 200,
    _id: account._id,
    role: account.role,
  });
}
