import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/BeautyFeelFinal";

async function connectDatabase() {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to database.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to database");
  }
}

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
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
