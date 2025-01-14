"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Logo from "./logo";

interface Props {
  children?: React.ReactNode;
}
const getActiveStyle = (path: string, currentPath: string) => {
  if (path === currentPath) {
    return "border-b-2 px-5";
  }
  return "";
};

function Hamburger({}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: session } = useSession();
  const path = usePathname();

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <nav id="hamburger" className="relative top-0  z-50">
      <div className="flex  h-10 py-1 shadow-md shadow-gray-200 w-full text-center justify-between px-5">
        <Logo />
        <Button
          className="p-0 bg-inherit hover:bg-inherit"
          onClick={() => setIsOpen(true)}
        >
          <MenuIcon className="h-6 w-6 text-black" />
        </Button>
      </div>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="p-2 h-fit z-50 w-full absolute top-0 left-0 right-0 bg-white  text-black text-center flex flex-col px-5 border-b-2 shadow-gray-300 pb-8 rounded-b-lg shadow-xl"
          >
            <Button
              className="p-0 bg-inherit hover:bg-inherit self-end"
              onClick={() => setIsOpen(false)}
            >
              <XIcon className="h-6 w-6 text-black" />
            </Button>
            <div className="flex gap-4 items-center flex-col text-sm">
              <Link href="/" className={getActiveStyle("/", path)}>
                Home
              </Link>
              {!session?.user?.email ? (
                <Link
                  href={"/auth/login"}
                  className="px-8 hover:bg-slate-800 text-white rounded-full   py-1 bg-slate-600"
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    href="/hackathon"
                    className={getActiveStyle("/hackathon", path)}
                  >
                    Hackathon
                  </Link>
                  <Link
                    href="/dashboard"
                    className={getActiveStyle("/dashboard", path)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                    }}
                    className="px-8 hover:bg-slate-800 rounded-full py-1 text-white bg-slate-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </nav>
  );
}

export default Hamburger;
