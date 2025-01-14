import React, { useEffect } from "react";

export const useClickOutside = (ref: React.RefObject<HTMLElement>) => {
  const [isOutside, setIsOutside] = React.useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOutside(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return { isOutside, setIsOutside };
};
