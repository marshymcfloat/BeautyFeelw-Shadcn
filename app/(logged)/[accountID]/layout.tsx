"use client";

import "@/app/globals.css";
import SideBar from "@/components/navigations/Sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/components/providers/ReduxProvider";

function CashierModal({ cashier }: { cashier: React.ReactNode }) {
  const cashierModalVisible = useSelector(
    (state: RootState) => state.modal.cashierModal
  );
  return <>{cashierModalVisible && cashier}</>;
}

function WorkModal({ work }: { work: React.ReactNode }) {
  const workModalVisible = useSelector(
    (state: RootState) => state.modal.workModal
  );
  return <>{workModalVisible && work}</>;
}

export default function LoggedLayout({
  children,
  cashier,
  work,
}: {
  children: React.ReactNode;
  cashier: React.ReactNode;
  work: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ReduxProvider>
          <SidebarProvider>
            <SideBar />
            {children}
            <CashierModal cashier={cashier} />
            <WorkModal work={work} />
          </SidebarProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
