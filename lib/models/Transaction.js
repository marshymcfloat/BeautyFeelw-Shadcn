import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  services: {
    type: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
        servedBy: { type: String, default: null },
        checkedBy: { type: String, default: null },
      },
    ],
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "ewallet", "bank"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "done"],
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  bookDateAndTime: {
    type: Date,
    required: true,
  },
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
