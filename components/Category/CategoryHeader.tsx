"use client";

import { cn } from "@/utils";
import { ComponentProps, useState } from "react";
import { GoFoldDown, GoFoldUp } from "react-icons./go";

type Props = {
  category: string;
  callback: Function;
} & ComponentProps<"div">;
const CategoryHeader = ({ category, callback }: Props) => {
  let [expand, setExpand] = useState(true);
  return (
    <div
      className={cn(
        "flex h-16 w-full items-center justify-between rounded-tl-md rounded-tr-md border-b border-slate-100 bg-white p-2 transition-all ease-in-out hover:bg-slate-100 active:bg-slate-200",
        { "rounded-bl-md rounded-br-md border-none": !expand },
      )}
      onClick={(e) => {
        setExpand(!expand);
        callback(e);
      }}
    >
      <h1 className="font-mono text-xl font-bold text-inherit">{category}</h1>
      {expand ? <GoFoldUp /> : <GoFoldDown />}
    </div>
  );
};

export default CategoryHeader;
