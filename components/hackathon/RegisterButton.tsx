"use client";
import { Button } from "@/components/ui/button";
import { HackathonData } from "@/interface/hackthon";
// import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

interface Props {
  data: HackathonData;
}

function RegisterButton({ data }: Props) {
  // const router = useRouter();

  // console.log({ data });
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClick = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/hackathon/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newData = await res.json();
      console.log(newData);
      toast.success("Registered Successfully");
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
        return;
      }
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      isLoading={isLoading}
      onClick={handleClick}
      disabled={data.isRegistered || data.isEventEnd}
      className={`text-sm px-10 py-2 w-full max-w-[280px] ${
        data.isRegistered
          ? "text-red-500 bg-slate-100 hover:bg-slate-100"
          : data.isEventEnd
          ? "text-black bg-slate-300 hover:bg-slate-200"
          : ""
      }`}
    >
      {data.isRegistered
        ? "Already Registered"
        : data.isEventEnd
        ? "Events Ended"
        : "One Click to Register"}
    </Button>
  );
}

export default RegisterButton;
