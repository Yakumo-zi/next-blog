"use client";
import { type PostMeta } from "@/app/(blog)/actions";
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
  const [expand, setExpand] = useState(true);
  //caculate the height of posts in the category

  let maxHeight = 0;
  if (expand) {
    maxHeight = fileList.length * 45;
  }
  return (
    <div className="w-full flex flex-col rounded-bl-sm rounded-br-sm overflow-hidden">
      <CategoryHeader callback={() => setExpand(!expand)} category={category} />
      <div
        className={cn(
          "w-full transition-all ease-in-out max-h-screen duration-200 ",
          {
            "max-h-0 overflow-hidden": !expand,
          }
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
