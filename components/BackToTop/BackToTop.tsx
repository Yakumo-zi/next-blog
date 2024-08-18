'use client'
import { cn } from "@/utils";
import { ComponentProps } from "react";
import { FaArrowUp } from "react-icons/fa";

type Props = {} & ComponentProps<"button">;
const BackToTop = ({ className, onClick, ...props }: Props) => {
  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  let clickHandler = onClick ? onClick : handleClick;
  return (
    <button
      onClick={clickHandler}
      className={cn(
        "h-12 w-12 rounded-full bg-white border border-blue-300 hover:bg-slate-50 active:bg-slate-100 shadow-lg",
        className
      )}
      {...props}
    >
      <FaArrowUp className="mx-auto h-6 w-6 text-sky-300" />
    </button>
  );
};

export default BackToTop;
