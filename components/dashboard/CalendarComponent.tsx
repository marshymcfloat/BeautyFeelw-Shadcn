export default function CalendarComponent() {
  return (
    <>
      <div className="md:hidden size-32 relative flex justify-center items-center  border-4 border-customBlack rounded-md">
        <span className="text-lg absolute top-0 left-0 ml-2 font-bold ">
          {new Date().toLocaleDateString(undefined, { month: "short" })}
        </span>
        <span className="font-bold text-[60px]">
          {String(new Date().getDate()).padStart(2, "0")}
        </span>
      </div>

      <div className="hidden size-36 max-h-[180px] md:w-[50%] min-w-[180px] md:flex flex-col justify-center relative items-center max-w-[250px] md:h-[25vh] shadow-lg border-4 border-black rounded-lg  px-2 py-4">
        <span className="text-lg md:text-2xl font-bold absolute top-0 left-0 p-4">
          {new Date().toLocaleDateString(undefined, { month: "short" })}
        </span>

        <span className="font-bold text-[80px] md:text-[100px] text-center">
          {String(new Date().getDate()).padStart(2, "0")}
        </span>
      </div>
    </>
  );
}

{
  /*  */
}
