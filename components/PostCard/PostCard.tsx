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
    tag: string,
  ) => {
    event.preventDefault();
    router.push(`/tags/${tag}`);
  };
  return (
    <Link
      href={`/post/${filename}`}
      className="flex min-h-36 min-w-full flex-col rounded-lg bg-white p-4 shadow-md transition-all ease-in-out hover:bg-slate-200 hover:shadow-lg"
      {...props}
    >
      <h1 className="mb-2 text-2xl font-bold">{meta.title}</h1>
      <div className="text-pretty text-sm text-gray-600">
        {meta.description}
      </div>
      <div className="flex flex-1 items-end gap-2">
        <Tag className="bg-violet-50">{meta.published}</Tag>
        <Tag
          callback={(e: React.MouseEvent<HTMLSpanElement>) => {
            e.preventDefault();
            router.push("/category");
          }}
          className="bg-lime-50"
        >
          {meta.category}
        </Tag>
        <div className="flex flex-1 justify-end gap-2">
          {meta.tags &&
            meta.tags.map((tag) => (
              <Tag
                className="bg-cyan-50"
                callback={(e: any) => onTagClick(e, tag)}
                key={tag}
              >
                #{tag}
              </Tag>
            ))}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
