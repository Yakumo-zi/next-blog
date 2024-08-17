import { getPostContent } from "@/app/actions";
import Link from "next/link";
import { ComponentProps } from "react";
import Tag from "../UI/Tag";

type Props = {
  filename: string;
  meta: {
    title: string;
    description: string;
    published: string;
    category: string;
    tags: string[];
  };
} & ComponentProps<"a">;
const PostCard = async ({ filename, meta, ...props }: Props) => {
  return (
    <Link
      href={`/post/${filename}`}
      className=" min-w-full min-h-36 flex flex-col bg-slate-50  rounded-lg p-4 hover:bg-slate-100 transition-all ease-in-out shadow-md hover:shadow-lg"
      {...props}
    >
      <h1 className="text-2xl font-bold mb-2">{meta.title}</h1>
      <div className="text-sm text-pretty text-gray-600">
        {meta.description}
      </div>
      <div className="flex-1 flex items-end gap-2">
        <Tag>{meta.published}</Tag>
        <Tag>{meta.category}</Tag>
        <div className="flex-1 flex justify-end gap-2">
          {meta.tags && meta.tags.map((tag) => <Tag key={tag}>#{tag}</Tag>)}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
