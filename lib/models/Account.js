import mongoose from "mongoose";
import bcrypt from "bcrypt";

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: [String],
    enum: ["owner", "cashier", "worker"],
    required: true,
  },
  salary: {
    type: Number,
    default: 0,
  },
  salaryHistory: {
    type: [{ amount: { type: Number }, date: { type: Date } }],
  },
  lastPay: {
    type: Date,
  },
});

accountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

accountSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Account =
  mongoose.models.Account || mongoose.model("Account", accountSchema);

export default Account;

/* async function createAdminAccount() {
  await connectDatabase();

  const newAccount = new Account({
    username: "ara",
    password: "ara123",
    role: ["worker", "cashier"],
  });
  await newAccount.save(); // Password will be hashed automatically
  console.log("Account created:", newAccount);
}

createAdminAccount().catch(console.error); */
