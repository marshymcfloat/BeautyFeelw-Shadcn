import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  cost: { type: Number },
  totalSales: { type: Number, default: 0 },
  branch: {
    type: String,
    required: true,
    enum: ["BF01", "BF02", "BF103", "BF104"],
  },
});

const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;

/* const dummyServices = [
  { name: "Classic Manicure", price: 300, cost: 150, branch: "BF01" },
  { name: "Gel Manicure", price: 500, cost: 250, branch: "BF01" },
  { name: "Classic Pedicure", price: 350, cost: 180, branch: "BF01" },
  { name: "Spa Pedicure", price: 600, cost: 300, branch: "BF01" },
  { name: "Nail Art Add-on", price: 200, cost: 80, branch: "BF01" },

  { name: "Basic Facial", price: 800, cost: 400, branch: "BF02" },
  { name: "Hydrating Facial", price: 1200, cost: 600, branch: "BF02" },
  { name: "Chemical Peel", price: 2000, cost: 900, branch: "BF02" },
  { name: "Microdermabrasion", price: 2500, cost: 1100, branch: "BF02" },
  { name: "Anti-Aging Treatment", price: 3000, cost: 1500, branch: "BF02" },

  { name: "Classic Lash Extensions", price: 1500, cost: 700, branch: "BF103" },
  { name: "Volume Lash Extensions", price: 2000, cost: 900, branch: "BF103" },
  { name: "Lash Lift & Tint", price: 1200, cost: 500, branch: "BF103" },
  { name: "Hybrid Lash Extensions", price: 1800, cost: 800, branch: "BF103" },
  { name: "Lash Removal", price: 500, cost: 200, branch: "BF103" },

  { name: "Swedish Massage", price: 1000, cost: 500, branch: "BF104" },
  { name: "Deep Tissue Massage", price: 1500, cost: 700, branch: "BF104" },
  { name: "Hot Stone Massage", price: 1800, cost: 900, branch: "BF104" },
  { name: "Aromatherapy Massage", price: 1600, cost: 800, branch: "BF104" },
  { name: "Reflexology Foot Massage", price: 1200, cost: 600, branch: "BF104" },
];

async function insertDummyServices() {
  try {
    const existingServices = await Service.find();
    console.log("Existing Services:", existingServices);

    if (existingServices.length === 0) {
      await Service.insertMany(dummyServices);
      console.log("Dummy services inserted successfully.");
    } else {
      console.log("Services already exist, skipping insertion.");
    }
  } catch (error) {
    console.error("Error inserting dummy services:", error);
  }
}

(async () => {
  await connectDatabase();
  await insertDummyServices();
})();
 */
