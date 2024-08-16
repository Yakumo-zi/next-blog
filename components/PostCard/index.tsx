import { getPostContent } from "@/app/actions";
import Link from "next/link";
import { ComponentProps } from "react";

type Props = {
  filename: string;
} & ComponentProps<"a">;
const PostCard = async ({ filename, ...props }: Props) => {
  const res = await getPostContent(filename);
  const meta = res.frontmatter;
  return (
    <Link
      href={`/post/${filename}`}
      className=" min-w-full min-h-36 flex flex-col bg-slate-50  rounded-lg p-4 hover:bg-slate-100 transition-all ease-in-out shadow-md hover:shadow-lg"
      {...props}
    >
      <h1 className="text-2xl font-bold mb-2">{meta.title}</h1>
      <div className="text-sm text-pretty text-gray-600">{meta.description}</div>
      <div className="flex-1 flex items-end gap-2">
        <span className=" bg-slate-300 rounded-lg px-2">{meta.published}</span>
        <span className=" bg-purple-300 rounded-lg px-2">{meta.category}</span>
        <div className="flex-1 flex justify-end gap-2">
          {meta.tags && meta.tags.map((tag) => <span className=" rounded-lg px-2 bg-orange-300" key={tag}>#{tag}</span>)}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
