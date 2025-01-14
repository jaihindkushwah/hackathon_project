"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { GoogleIcon } from "@/components/google-icon";

function Page() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Profile</h1>
      <p>Name:{session?.user?.name}</p>
      <p>Email:{session?.user?.email}</p>
      <p>Image{session?.user?.image}</p>
      <GoogleIcon />
      <span>{JSON.stringify(session)}</span>
    </div>
  );
}

export default Page;
