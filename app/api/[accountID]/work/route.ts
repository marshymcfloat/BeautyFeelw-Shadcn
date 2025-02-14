import Transaction from "@/lib/models/Transaction";

export async function GET() {
  const foundTransactions = await Transaction.find({});

  return new Response(JSON.stringify({ data: foundTransactions }));
}
