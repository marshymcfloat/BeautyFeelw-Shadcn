"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { modalActions } from "@/components/slices/ModalSlice";
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LogOut,
  House,
  Coins,
  SquareChartGantt,
  Settings2,
} from "lucide-react";

export default function SideBar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = {
    _id: "abcdef12345",
    role: ["owner", "cashier", "worker"],
    name: "Daniel",
  };

  const sidebarContents = [
    {
      name: "home",
      role: ["owner", "cashier", "worker"],
      content: (
        <SidebarMenuItem
          className="py-2"
          key="home"
          onClick={() => {
            router.replace(`${user._id}`);
          }}
        >
          <SidebarMenuButton className="py-2">
            <House />
            <span>Home</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ),
    },
    {
      name: "cashier",
      role: ["owner", "cashier"],
      content: (
        <SidebarMenuItem key="cashier" className="py-2">
          <SidebarMenuButton
            onClick={() => dispatch(modalActions.showCashier())}
          >
            <Coins />
            <span>Cashier</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ),
    },
    {
      name: "worker",
      role: ["worker", "owner"],
      content: (
        <SidebarMenuItem
          key="worker"
          className="py-2"
          onClick={() => {
            dispatch(modalActions.showWork());
          }}
        >
          <SidebarMenuButton>
            <SquareChartGantt />
            <span>Work</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ),
    },
    {
      name: "services",
      role: ["owner"],
      content: (
        <SidebarMenuItem key="services" className="py-2">
          <SidebarMenuButton>
            <Settings2 />
            <span>Services</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ),
    },
  ];

  return (
    <Sidebar className="absolute">
      <SidebarHeader>
        <h1 className="text-center text-2xl font-bold tracking-widest">
          BeautyFeel
        </h1>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarGroup className="300">
        {sidebarContents
          .filter((item) => item.role.some((r) => user.role.includes(r)))
          .map((item) => item.content)}
      </SidebarGroup>
      <SidebarFooter className="list-none absolute bottom-[0px] mb-4 w-full">
        <SidebarMenuItem className="">
          <SidebarMenuButton className="">
            <LogOut />
            <span>Log Out</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
