type TransactionProps = {
  name: string;
  grandTotal: number;
};

import Customer from "@/lib/models/Customer";

export function formalizeName(text: string): string {
  if (text.trim() === "") {
    throw new Error("Invalid input: Name cannot be empty.");
  }

  return text
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export async function checkCustomer(
  customer: string,
  transaction: TransactionProps
) {
  const foundCustomer = await Customer.findOne({ name: customer });

  if (foundCustomer) {
    await Customer.findByIdAndUpdate(foundCustomer._id, {
      totalPaid: foundCustomer.totalPaid + transaction.grandTotal, // Accumulate total paid
    });
  } else {
    const newCustomer = new Customer({
      name: customer, // Use formatted name
      totalPaid: transaction.grandTotal,
    });

    await newCustomer.save();
  }
}
