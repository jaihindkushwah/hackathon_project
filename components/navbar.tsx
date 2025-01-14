"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
interface Props {
  children?: React.ReactNode;
}
const getActiveStyle = (path: string, currentPath: string) => {
  if (path === currentPath) {
    return "border-b-2 px-1";
  }
  return "px-1";
};

function Navbar({}: Props) {
  const { data: session } = useSession();
  const path = usePathname();
  // const handleLogin = () => {
  //   signIn("", { callbackUrl: "/dashboard" });
  // };
  return (
    <>
      <nav className="p-2 h-16 shadow-md shadow-gray-200 text-black w-full text-center flex justify-between px-10">
        <Logo />
        <div className="flex gap-4 items-center text-base ">
          {!session?.user?.email ? (
            <Link
              href={"/auth/login"}
              className="px-8 hover:bg-slate-800 text-white rounded-full   py-1 bg-slate-600"
            >
              Login
            </Link>
          ) : (
            // <button
            //   onClick={handleLogin}
            //   className="px-8 hover:bg-slate-800 text-white rounded-full   py-1 bg-slate-600"
            // >
            //   Login
            // </button>
            <>
              <Link
                href="/hackathon"
                className={getActiveStyle(path, "/hackathon")}
              >
                Hackathon
              </Link>
              <Link
                href="/dashboard"
                className={getActiveStyle(path, "/dashboard")}
              >
                Dashboard
              </Link>
              {/* <Link
                href={"/profile"}
                className={getActiveStyle(path, "/profile")}
              >
                Profile
              </Link> */}
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
                className="px-8 hover:bg-slate-800 rounded-full  py-1 bg-slate-600 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
