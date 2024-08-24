"use client";
import { type PostMeta } from "@/app/actions";
import CategoryHeader from "./CategoryHeader";
import { cn } from "@/utils";
import { useState } from "react";
import CategoryPostItem from "./CategoryPostItem";

type Props = {
  category: string;
  fileList: Array<{
    meta: PostMeta;
    filename: string;
  }>;
};
const CategoryPostList = ({ category, fileList }: Props) => {
  const [expand, setExpand] = useState(false);
  //caculate the height of posts in the category

  let maxHeight = 0;
  if (expand) {
    maxHeight = fileList.length * 45;
  }
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-bl-md rounded-br-md">
      <CategoryHeader callback={() => setExpand(!expand)} category={category} />
      <div
        className={cn(
          "max-h-screen w-full transition-all duration-200 ease-in-out",
          {
            "max-h-0 overflow-hidden": !expand,
          },
        )}
      >
        {fileList.map((pair) => {
          return <CategoryPostItem key={pair.filename} pair={pair} />;
        })}
      </div>
    </div>
  );
};

export default CategoryPostList;
