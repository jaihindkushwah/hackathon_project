import React from "react";

interface IProps {
  title?: string;
  children?: React.ReactNode;
}

function NotFound({ title, children }: IProps) {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="md:px-8 px-2 z-20 flex justify-center items-center py-3 text-red-500">
        {title ?? "Page Not Found"}
        {children}
      </div>
    </div>
  );
}

export default NotFound;
