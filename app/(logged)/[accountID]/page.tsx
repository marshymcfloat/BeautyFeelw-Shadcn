"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import CalendarComponent from "@/components/dashboard/CalendarComponent";
import TransactionCount from "@/components/dashboard/TransactionCount";
import { Sales } from "@/components/dashboard/Sales";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

export default function DashboardPage() {
  return (
    <main className="w-full ">
      <SidebarTrigger className="absolute" />

      <div className="w-[95%] h-[90%]  mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row flex-wrap gap-4 p-4">
        <div className="flex-[1.5]  flex-col flex p-4 bg-slate-50 min-h-[450px] w-full md:w-auto">
          <div className="w-full h-[45%] flex gap-4  justify-around">
            <CalendarComponent />
            <TransactionCount />
          </div>
          <div className="h-[45%] ">
            <Sales />
          </div>
        </div>
        <div className="flex-1 bg-slate-100 min-h-[150px] w-full md:w-auto">
          <RecentTransactions />
        </div>
        <div className="flex-[1.5] bg-slate-200 min-h-[150px] w-full md:w-auto"></div>
      </div>
    </main>
  );
}
