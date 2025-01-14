import { cn } from "@/lib/utils";
import { Rocket } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}
function Logo({ className }: Props) {
  return (
    <Link
      className={cn("flex items-center justify-center text-black", className)}
      href="/"
    >
      <Rocket className="h-6 w-6 mr-2" />
      <span className="font-bold">HackathonHub</span>
    </Link>
    // <Link
    //   href="/"
    //   className={cn(
    //     "flex items-center text-white h-8 w-8 sm:h-12 sm:w-12  justify-center text-center bg-green-500 text-sm   rounded-full",
    //     className
    //   )}
    // >
    //   <Image
    //     src={
    //       "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg"
    //     }
    //     alt="logo"
    //     width={1920}
    //     height={1080}
    //     className="rounded-full  border shadow-sm"
    //   />
    // </Link>
  );
}

export default Logo;
