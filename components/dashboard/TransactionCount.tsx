export default function TransactionCount() {
  return (
    <div className="w-[50%] min-w-[180px] flex flex-col justify-center relative items-center max-w-[250px] h-[25vh] shadow-lg border-4 border-black rounded-lg  px-2 py-4">
      <span className="text-2xl font-bold absolute top-0 left-0 p-4">
        Transactions
      </span>

      <span className="font-bold text-[100px] text-center">
        {String(new Date().getDate()).padStart(2, "0")}
      </span>
    </div>
  );
}
