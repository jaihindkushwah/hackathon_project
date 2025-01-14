"use client";
import Card from "@/components/Card";
import React, { useCallback, useEffect } from "react";
import PageLoader from "./PageLoader";
import NotFound from "./NotFound";
import { toast } from "react-toastify";

// const getData = async () => {
//   const response = await fetch("http://localhost:3000/api/hackathons");
//   return response.json();
// };

export default function Events() {
  const [currentTab, setCurrentTab] = React.useState("created");
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getStyle = useCallback(
    (tab: string) => {
      if (currentTab === tab && tab === "created") {
        return "flex items-center text-sm gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white font-medium  shadow-md";
      } else if (currentTab === tab && tab === "participated") {
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
        const response = await fetch(`/api/user/${currentTab}`);
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
    <div className="flex flex-col gap-2 ">
      <div className="md:px-8 px-2   py-3 ">
        <h1 className="text-xl font-semibold w-full text-gray-600 text-center capitalize">
          View created and participated in events
        </h1>
        <div className="flex justify-end gap-1 px-5 items-center py-1 mt-1">
          <span>
            <button
              onClick={() => setCurrentTab("created")}
              className={`${getStyle("created")}`}
              title="Created Hackathons"
            >
              <span className="text-white">Created Hackathons</span>
            </button>
          </span>
          <span>
            <button
              onClick={() => setCurrentTab("participated")}
              // className="flex items-center text-sm gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-medium  shadow-md "
              className={` ${getStyle("participated")} `}
              title="Participated participated"
            >
              <span className="text-white">Participated Hackathons</span>
            </button>
          </span>
        </div>
        <div className="flex justify-between">
          <h2 className="mb-2 text-white min-[480px]:text-lg text-base font-bold">
            {currentTab === "completed"
              ? "Participated Hackathons"
              : currentTab === "ongoing"
              ? " Created Hackathons"
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
