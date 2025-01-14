"use client";
import Card from "@/components/Card";
import React, { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import PageLoader from "../PageLoader";
import NotFound from "../NotFound";

export default function TrackHackathon() {
  const [currentTab, setCurrentTab] = React.useState("ongoing");
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getStyle = useCallback(
    (tab: string) => {
      if (currentTab === tab && tab === "ongoing") {
        return "flex items-center text-sm gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white font-medium  shadow-md";
      } else if (currentTab === tab && tab === "completed") {
        return "flex items-center text-sm gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white font-medium  shadow-md";
      }
      return "flex items-center text-sm gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 text-white font-medium  shadow-md";
    },
    [currentTab]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/hackathons?status=${currentTab}`);
        const data = await response.json();
        setData(data.data || []);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
          return;
        }
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentTab]);
  return (
    <div className="md:px-8 px-2   py-3 ">
      <h1 className="text-xl text-gray-600 font-semibold w-full text-center capitalize">
        Track ongoing and past hackathons
      </h1>
      <div className="flex justify-end gap-1 px-5 items-center py-1 mt-1">
        <span>
          <button
            onClick={() => setCurrentTab("ongoing")}
            className={`${getStyle("ongoing")}`}
            title="On Going Hackathons"
          >
            <span className="text-white ">On Going Hackathons</span>
          </button>
        </span>
        <span>
          <button
            onClick={() => setCurrentTab("completed")}
            // className="flex items-center text-sm gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-medium  shadow-md "
            className={` ${getStyle("completed")} `}
            title="Past Hackathons"
          >
            <span className="text-white">Past Hackathons</span>
          </button>
        </span>
      </div>
      <div className="flex justify-between">
        <h2 className="mb-2 text-white min-[480px]:text-lg text-base font-bold">
          {currentTab === "completed"
            ? "Past Hackathons"
            : currentTab === "ongoing"
            ? " On Going Hackathons"
            : "All Hackathons"}
        </h2>
      </div>

      {isLoading && <PageLoader />}
      {!isLoading && data?.length >= 0 && (
        <div className="flex  gap-5 flex-wrap ">
          {data?.map((item: any) => {
            return <Card key={item._id} data={item} />;
          })}
        </div>
      )}
      {!isLoading && data.length == 0 && <NotFound title="No data found" />}
    </div>
  );
}
