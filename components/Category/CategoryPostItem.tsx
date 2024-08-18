import { PostMeta } from "@/app/actions";
import { cn } from "@/utils";
import Link from "next/link";
import Tag from "../UI/Tag";

type Props = {
  pair: {
    meta: PostMeta;
    filename: string;
  };
};
const CategoryPostItem = ({ pair }: Props) => {
  return (
    <Link
      href={`/post/${pair.filename}`}
      className="w-full"
      key={pair.filename}
    >
      <div
        className={cn(
          "w-full flex gap-2 p-2 box-border bg-white hover:bg-slate-100 transition-all ease-in-out border-b border-slate-100"
        )}
      >
        <span>{pair.meta.title}</span>
        <div className="flex flex-1 justify-end gap-2">
          <Tag className="bg-violet-50 hover:transform-none">
            {" "}
            {pair.meta.published}
          </Tag>
          <div className="min-w-48 flex gap-2 justify-around">
            {pair.meta.tags.slice(0, 3).map((tag) => {
              return (
                <Tag key={tag} className="bg-cyan-50 hover:transform-none">
                  #{tag}
                </Tag>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryPostItem;
