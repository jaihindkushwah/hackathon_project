"use client";
// import Header from "@/components/header";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {
  children: React.ReactNode;
  session: Session | null;
}
function AppProvider({ session, children }: Props) {
  return (
    <SessionProvider session={session}>
      {/* <Header /> */}
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </SessionProvider>
  );
}

export default AppProvider;
