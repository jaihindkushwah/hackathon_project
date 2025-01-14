import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(
  (
    { className, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => (
    <input
      className={cn(
        "flex-1 border bg-transparent  outline-none focus:ring-2 focus:ring-slate-200  border-gray-300 rounded-md sm:p-2 p-1.5 focus:outline-none  ",
        className
      )}
      {...props}
      ref={ref}
    />
  )
);
Input.displayName = "Input";
