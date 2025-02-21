import mongoose from "mongoose";

const setSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  includedServices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
});

const Set = mongoose.models.Set || mongoose.model("Set", setSchema);

export default Set;
/* const dummySet = [
  {
    name: "Basic Nail Care Package",
    totalPrice: 800,
    totalCost: 380,
    includedServices: ["67a9a020c46dfb6c0d4050b7", "67a9a020c46dfb6c0d4050b9"],
  },
  {
    name: "Luxury Nail Care Package",
    totalPrice: 1300,
    totalCost: 630,
    includedServices: [
      "67a9a020c46dfb6c0d4050b8",
      "67a9a020c46dfb6c0d4050ba",
      "67a9a020c46dfb6c0d4050bb",
    ],
  },
  {
    name: "Complete Facial Package",
    totalPrice: 5500,
    totalCost: 2500,
    includedServices: [
      "67a9a020c46dfb6c0d4050bc",
      "67a9a020c46dfb6c0d4050bd",
      "67a9a020c46dfb6c0d4050be",
      "67a9a020c46dfb6c0d4050bf",
      "67a9a020c46dfb6c0d4050c0",
    ],
  },
  {
    name: "Lash Beauty Package",
    totalPrice: 4500,
    totalCost: 2100,
    includedServices: [
      "67a9a020c46dfb6c0d4050c1",
      "67a9a020c46dfb6c0d4050c2",
      "67a9a020c46dfb6c0d4050c4",
    ],
  },
  {
    name: "Relaxation Massage Package",
    totalPrice: 6500,
    totalCost: 3300,
    includedServices: [
      "67a9a020c46dfb6c0d4050c6",
      "67a9a020c46dfb6c0d4050c7",
      "67a9a020c46dfb6c0d4050c8",
      "67a9a020c46dfb6c0d4050c9",
      "67a9a020c46dfb6c0d4050ca",
    ],
  },
];

async function insertDummyServices() {
  try {
    const existingSets = await Set.countDocuments();
    if (existingSets === 0) {
      await Set.insertMany(dummySet);
      console.log("Dummy sets inserted successfully.");
    } else {
      console.log("Sets already exist, skipping insertion.");
    }
  } catch (error) {
    console.error("Error inserting dummy sets:", error);
  }
}

(async () => {
  await connectDatabase();
  await insertDummyServices();
})();
 */
