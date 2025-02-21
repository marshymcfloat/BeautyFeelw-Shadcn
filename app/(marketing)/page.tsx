import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="md:hidden flex flex-col relative">
        <div className="my-4 py-2 text-center border-b-2 border-customBlack text-md">
          <p>Your Beauty, Our Passion</p>
        </div>
        <div className="">
          <h1 className="text-3xl font-bold tracking-[15px] ml-3 uppercase">
            beautyfeel
          </h1>
        </div>
        <div className="flex justify-around absolute bottom-[-70px]  w-full">
          <Button className="text-customBGPink hover:bg-transparent min-w-[105px]  hover:text-black border-2 border-black">
            Availability
          </Button>
          <Button className="text-customBGPink hover:bg-transparent min-w-[105px] hover:text-black border-2 border-black">
            Services
          </Button>
        </div>
      </div>

      <div className="hidden md:flex flex-col relative">
        <div className="border-b-2  py-2 text-center tracking-widest text-xl border-black">
          <p>Your Beauty, Our Passion</p>
        </div>
        <div className="flex  ">
          <h1 className="ml-[3%] uppercase  text-center  tracking-[80px] text-[5rem]">
            beautyfeel
          </h1>
        </div>
        <div className="flex w-[50%]  absolute bottom-[-80px] left-1/2 -translate-x-1/2 justify-between">
          <Button className="text-customBGPink hover:bg-transparent min-w-[105px] hover:text-black border-2 border-black">
            Availability
          </Button>
          <Button className="text-customBGPink hover:bg-transparent min-w-[105px] hover:text-black border-2 border-black">
            Services
          </Button>
        </div>
      </div>
    </main>
  );
}

{
  /* <div className=" flex flex-col relative">
        <div className="border-b-2 text-center tracking-widest text-xl border-black">
          <p>Your Beauty, Our Passion</p>
        </div>
        <div className="flex  ">
          <h1 className="ml-[3%] uppercase  text-center  tracking-[80px] text-[5rem]">
            beautyfeel
          </h1>
        </div>
        <div className="flex w-[50%]  absolute bottom-[-80px] left-1/2 -translate-x-1/2 justify-between">
          <Button className="text-customBGPink hover:bg-transparent min-w-[105px] hover:text-black border-2 border-black">
            Availability
          </Button>
          <Button className="text-customBGPink hover:bg-transparent min-w-[105px] hover:text-black border-2 border-black">
            Services
          </Button>
        </div>
      </div> */
}
