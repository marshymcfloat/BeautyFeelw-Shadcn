import { FacebookLogo } from "@phosphor-icons/react";
import Link from "next/link";
export default function MarketingFooter() {
  return (
    <footer className="flex items-center h-[5vh] max-h-[40px] bg-customBlack absolute bottom-0 w-screen">
      <div className="flex cursor-pointer w-[12%] items-center  justify-around ">
        <Link target="_blank" href={"https://www.facebook.com/beautyfeelSkin"}>
          <FacebookLogo size={32} color="#F7CAC9" />
        </Link>

        <Link target="_blank" href={"https://www.facebook.com/beautyfeelSkin"}>
          <h1 className="uppercase tracking-[5px] text-customBGPink font-bold  text-sm">
            BeautyFeel
          </h1>
        </Link>
      </div>
    </footer>
  );
}
