"use client";

import { cn } from "@/utils";
import { ComponentProps, useState } from "react";
import { GoFoldDown, GoFoldUp } from "react-icons/go";

type Props = {
  category: string;
  callback: Function;
} & ComponentProps<"div">;
const CategoryHeader = ({ category, callback }: Props) => {
  let [expand, setExpand] = useState(true);
  return (
    <div
      className={cn(
        "w-full h-16 bg-white rounded-tl-md  rounded-tr-md flex items-center justify-between p-2 hover:bg-slate-100 transition-all ease-in-out border-b border-slate-100 active:bg-slate-200",
        { "rounded-bl-md rounded-br-md border-none ": !expand }
      )}
      onClick={(e) => {
        setExpand(!expand);
        callback(e);
      }}
    >
      <h1 className=" text-inherit font-bold font-mono text-xl">{category}</h1>
      {expand ? <GoFoldUp /> : <GoFoldDown />}
    </div>
  );
};

export default CategoryHeader;
