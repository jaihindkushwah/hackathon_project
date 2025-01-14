"use client";
import { Rocket } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Hamburger from "./hamburger";

function LandingPageHeader() {
  const { data: session } = useSession();
  return (
    <>
      <div className="min-[540px]:hidden h-full text-black">
        <Hamburger />
      </div>

      <header className="px-4 max-[540px]:hidden lg:px-6 h-14 flex items-center text-black">
        <Link className="flex items-center justify-center" href="/">
          <Rocket className="h-6 w-6 mr-2" />
          <span className="font-bold">HackathonHub</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {!session?.user.email ? (
            <>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#"
              >
                Features
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/auth/register"
              >
                Register
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/auth/login"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/hackathon"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Hackathon
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </header>
    </>
  );
}

export default LandingPageHeader;
