import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/BeautyFeelFinal";

async function connectDatabase() {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to database.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to database");
  }
}

connectDatabase();

const voucherSchema = new mongoose.Schema({
  code: { type: String, required: true, minlength: 5, maxlength: 5 },
  value: { type: Number, required: true },
  usedOn: { type: Date, default: null },
});

const Voucher =
  mongoose.models.Voucher || mongoose.model("Voucher", voucherSchema);

export default Voucher;
/* 
Voucher.insertMany([
  { code: "ABCDE", value: 30 },
  { code: "FGHIJ", value: 30 },
]);
 */
