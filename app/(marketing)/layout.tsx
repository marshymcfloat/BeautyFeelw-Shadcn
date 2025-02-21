"use client";

import "@/app/globals.css";
import Navbar from "@/components/landing/Navbar";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { RootState } from "@/components/providers/ReduxProvider";
import MarketingFooter from "@/components/ui/MarketingFooter";
import { useSelector } from "react-redux";

function LoginModal({ login }: { login: React.ReactNode }) {
  const loginModalVisibility = useSelector(
    (state: RootState) => state.marketingModal.loginModal
  );
  return <>{loginModalVisibility && login}</>;
}

export default function MarketingLayout({
  children,
  login,
}: {
  children: React.ReactNode;
  login: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-custom-gradient bg-[length:200%_200%] animate-gradient ">
        <ReduxProvider>
          <Navbar />

          {children}
          <LoginModal login={login} />
          <MarketingFooter />
        </ReduxProvider>
      </body>
    </html>
  );
}
