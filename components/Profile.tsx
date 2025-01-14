"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

function Profile() {
  const { data: session } = useSession();
  return (
    <div className="container mx-auto max-w-xl sm:px-5 sm:py-5">
      <div className="flex flex-col items-center gap-2 text-black">
        <div className="h-32 w-32">
          <Image
            src={session?.user?.image || ""}
            alt={session?.user?.name || ""}
            width={1920}
            height={1080}
            className="rounded-full"
          />
        </div>

        <h1 className="text-2xl font-bold">{session?.user?.name}</h1>

        <div className="mt-5 flex flex-col gap-2">
          <p>
            {/* <span className="font-semibold text-slate-300">Email:</span> */}
            {session?.user?.email}
          </p>
          {/* want to change password password */}
          {/* <div>
            <span className="font-light text-slate-700">
              Want to change password
            </span>
          </div> */}
          <div>
            <Button className="h-8 bg-slate-600 hover:bg-slate-500 text-sm">
              <span>Logout</span>
            </Button>
          </div>
          <div>
            <Button className="bg-red-500 hover:bg-red-600 text-sm">
              <span>Delete Account</span>
            </Button>
          </div>
          {/* want to add a logout button */}
          {/* want to add a delete account button */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
