import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/BeautyFeelFinal";

export async function connectDatabase() {
  if (mongoose.connection.readyState >= 1) {
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

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  totalPaid: {
    type: Number,
    default: 0,
  },
});

const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
/* 
async function createCustomer() {
  await connectDatabase();

  try {
    const newCustomer = new Customer({ name: "Dyannah Alcantara" });
    await newCustomer.save();
    console.log("Customer saved successfully");
  } catch (error) {
    console.error("Error saving customer:", error);
  } finally {
    mongoose.connection.close();
  }
}

createCustomer();
 */
