"use client";
import React, { forwardRef } from "react";
import Card, { CardBody, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { HackathonData } from "@/interface/hackthon";
import { toast } from "react-toastify";
interface ICardProps {
  data?: HackathonData;
}

const getDateTimeString = (date?: string) => {
  return (
    new Date(date || "").toLocaleDateString() +
    " " +
    new Date(date || "").toLocaleTimeString()
  );
};

const CardFooterButton = ({ data }: ICardProps) => {
  const navigate = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClick = async () => {
    try {
      if (!data?._id) return;
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
      navigate.refresh();
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
    <CardFooter className="flex gap-2 items-center justify-center">
      {data?.isEventEnd && (
        <span className="text-red-500 rounded-full px-4 py-1 bg-slate-200">
          Event has ended
        </span>
      )}
      {!data?.isEventEnd && data?.isRegistered && (
        <span className="text-red-500 rounded-full px-4 py-1 bg-slate-200">
          Already Registered
        </span>
      )}
      {!data?.isRegistered && !data?.isEventEnd && (
        <Button isLoading={isLoading} onClick={handleClick}>
          Click to Register
        </Button>
      )}
      <Button
        className="bg-slate-500 hover:bg-slate-400 text-white"
        onClick={() => {
          navigate.push(`/hackathon/${data?._id}`);
        }}
      >
        View Details
      </Button>
    </CardFooter>
  );
};

const HackathonCard = forwardRef(function (
  { data, ...props }: ICardProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <Card
      className="bg-white shadow-md rounded-lg flex flex-col p-0 max-w-sm hover:shadow-lg transition-shadow"
      {...props}
      ref={ref}
    >
      <CardHeader
        className={`mb-0 max-sm:text-sm max-sm:text-wrap  min-[540px]:px-4 px-2 rounded-t-lg text-black font-bold truncate border-t-2 shadow-sm py-2 `}
      >
        {data?.title || "Hackathon Title"}
      </CardHeader>

      <CardBody className="p-4 bg-white rounded-lg shadow-sm mb-4">
        <p className="text-gray-600 text-base line-clamp-3 mb-4">
          {data?.description || "No description available for this hackathon."}
        </p>

        <div className="text-sm text-gray-500 divide-y divide-gray-200">
          <div className="py-2">
            <span className="font-medium text-gray-700">Location: </span>
            <span>{data?.location || "N/A"}</span>
          </div>
          <div className="py-2">
            <span className="font-medium text-gray-700">Start Date: </span>
            <span>{getDateTimeString(data?.startDate) || "N/A"}</span>
          </div>
          <div className="py-2">
            <span className="font-medium text-gray-700">End Date: </span>
            <span>{getDateTimeString(data?.endDate) || "N/A"}</span>
          </div>
          <div className="py-2">
            <span className="font-medium text-gray-700">
              Total Participants:{" "}
            </span>
            <span>{data?.totalParticipants ?? 0}</span>
          </div>
          <div className="py-2">
            <span className="font-medium text-gray-700">Created At: </span>
            <span>{getDateTimeString(data?.createdAt || "") || "N/A"}</span>
          </div>
        </div>
      </CardBody>

      <CardFooterButton data={data} />
    </Card>
  );
});

HackathonCard.displayName = "HackathonCard";

export default HackathonCard;
