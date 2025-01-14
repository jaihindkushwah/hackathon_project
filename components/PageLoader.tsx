import React from "react";
import Loader from "./ui/loader";

function PageLoader() {
  return (
    <div className="flex flex-1 flex-col gap-2 ">
      <div className="md:px-8 px-2 z-20 flex justify-center items-center py-3 ">
        <Loader className="w-10 h-10 text-black" />
      </div>
    </div>
  );
}

export default PageLoader;
