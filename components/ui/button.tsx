import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes, forwardRef } from "react";
import Loader from "./loader";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, isLoading, ...props }, ref) => {
    return (
      <button
        className={cn(
          "px-4 py-1 rounded-full bg-green-500 max-w-[200px]  text-white hover:bg-green-600",
          className
        )}
        {...props}
        ref={ref}
      >
        {isLoading ? (
          <span className="flex justify-center items-center gap-2">
            <Loader />
            Loading...
          </span>
        ) : (
          props.children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
