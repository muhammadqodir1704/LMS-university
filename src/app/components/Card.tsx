import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

function Card({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={twMerge("border border-gray-20 rounded-[10px] ", className)}
    >
      {children}
    </div>
  );
}

export default Card;
