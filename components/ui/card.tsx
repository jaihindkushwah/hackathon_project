import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

type IProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef(function (
  { className, ...props }: IProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      className={cn(
        "bg-white flex flex-col space-y-2 shadow-sm   gap-1 text-black rounded-lg flex-1 min-w-[300px] max-w-xl",
        className
      )}
      {...props}
      ref={ref}
    />
  );
});
Card.displayName = "Card";

export const CardHeader = forwardRef(
  (
    { className, ...props }: IProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className={cn("font-bold text-base", className)}
        {...props}
        ref={ref}
      />
    );
  }
);
CardHeader.displayName = "CardHeader";

export const CardFooter = forwardRef(
  (
    { className, ...props }: IProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className={cn(
          "text-xs justify-self-end text-gray-600  min-[540px]:p-2 p-1 pb-4",
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);
CardFooter.displayName = "CardFooter";

export const CardBody = forwardRef(
  (
    { className, ...props }: IProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className={cn("text-sm  min-[540px]:px-4 px-2", className)}
        {...props}
        ref={ref}
      />
    );
  }
);
CardBody.displayName = "CardBody";

export default Card;
