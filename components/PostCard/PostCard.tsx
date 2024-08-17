"use client";
import Link from "next/link";
import { ComponentProps } from "react";
import Tag from "../UI/Tag";
import { useRouter } from "next/navigation";

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
const PostCard = ({ filename, meta, ...props }: Props) => {
  const router = useRouter();
  const onTagClick = (
    event: React.MouseEvent<HTMLSpanElement>,
    tag: string
  ) => {
    event.preventDefault();
    router.push(`/tags/${tag}`);
  };
  return (
    <Link
      href={`/post/${filename}`}
      className=" min-w-full min-h-36 flex flex-col bg-white  rounded-lg p-4 hover:bg-slate-200 transition-all ease-in-out shadow-md hover:shadow-lg"
      {...props}
    >
      <h1 className="text-2xl font-bold mb-2">{meta.title}</h1>
      <div className="text-sm text-pretty text-gray-600">
        {meta.description}
      </div>
      <div className="flex-1 flex items-end gap-2">
        <Tag className="bg-violet-50">{meta.published}</Tag>
        <Tag className="bg-lime-50">{meta.category}</Tag>
        <div className="flex-1 flex justify-end gap-2">
          {meta.tags &&
            meta.tags.map((tag) => (
              <Tag className="bg-cyan-50" onClick={(e) => onTagClick(e, tag)} key={tag}>
                #{tag}
              </Tag>
            ))}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
