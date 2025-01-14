"use client";
import Card from "@/components/Card";
import NotFound from "@/components/NotFound";
import PageLoader from "@/components/PageLoader";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { toast } from "react-toastify";

function Page() {
  const [currentTab, setCurrentTab] = React.useState("upcoming");
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getStyle = useCallback(
    (tab: string) => {
      if (currentTab === tab && tab === "upcoming") {
        return "flex items-center text-xs sm:text-sm gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white font-medium  shadow-md";
      } else if (currentTab === tab && tab === "completed") {
        return "flex items-center sm:text-sm text-xs gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white font-medium  shadow-md";
      }
      return "flex items-center sm:text-sm gap-2 text-xs px-4 py-2 bg-green-500 hover:bg-green-400 text-white font-medium  shadow-md";
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
  // if (isLoading) {
  //   return <PageLoader />;
  // }

  return (
    <div className="flex flex-col gap-2 ">
      <div className="md:px-8 px-2 z-20 border-2 py-3 ">
        <div className="flex justify-end gap-1 px-5 items-center py-1 mt-1">
          <span>
            <button
              onClick={() => setCurrentTab("upcoming")}
              className={`${getStyle("upcoming")}`}
              title="Upcoming Hackathons"
            >
              <span>Upcoming Hackathons</span>
            </button>
          </span>
          <span>
            <button
              onClick={() => setCurrentTab("completed")}
              // className="flex items-center text-sm gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-medium  shadow-md "
              className={` ${getStyle("completed")} `}
              title="Past Hackathons"
            >
              <span>Past Hackathons</span>
            </button>
          </span>
          <span>
            <Link
              href="/hackathon/create"
              className={`${getStyle("")}`}
              title="Create Hackathon"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Create Hackathon</span>
            </Link>
          </span>
        </div>
        <div className="flex justify-between">
          <h2 className="mb-2 text-black min-[480px]:text-xl text-base font-bold">
            {currentTab === "completed"
              ? "Past Hackathons"
              : currentTab === "upcoming"
              ? " Upcoming Hackathons"
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
    </div>
  );
}

export default Page;
