import { NextRequest } from "next/server";
import { connectDatabase } from "@/lib/models/Customer";
import Customer from "@/lib/models/Customer";
export async function GET(req: NextRequest) {
  try {
    await connectDatabase();

    const { searchParams } = new URL(req.url);
    const name = searchParams.get("customerName");

    const foundCustomers = await Customer.find({
      name: { $regex: `^${name}`, $options: "i" },
    })
      .limit(5)
      .lean();

    if (foundCustomers) {
      return new Response(JSON.stringify({ customers: foundCustomers }), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ customers: [] }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Database Query Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
