import { PostMeta } from "@/app/(blog)/actions";
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
          "box-border flex w-full gap-2 border-b border-slate-100 bg-white p-2 transition-all ease-in-out hover:bg-slate-100",
        )}
      >
        <span>{pair.meta.title}</span>
        <div className="flex flex-1 justify-end gap-2">
          <Tag className="bg-violet-50 hover:transform-none">
            {" "}
            {pair.meta.published}
          </Tag>
          <div className="flex min-w-48 justify-around gap-2">
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
