import Tag from "../UI/Tag";
import Link from "next/link";
import { cn, randomColor } from "@/utils";
import { ComponentProps } from "react";
type Props = {
  tags?: string[];
} & ComponentProps<"div">;
const TagsCard = async ({ className, tags }: Props) => {
  if (!tags) {
    return null;
  }
  return (
    <div
      className={cn(
        "flex min-h-12 w-64 flex-col items-center justify-center gap-2 rounded-lg bg-stone-50 p-2 shadow-md",
        className,
      )}
    >
      <div className="inline-flex w-full select-none items-center justify-center border-b-2 pb-2">
        All Tags
      </div>
      <div className="flex flex-wrap justify-evenly gap-2">
        {tags.map((tag) => (
          <Tag key={tag} className={`m-1shrink-0 ${randomColor()}`}>
            <Link href={`/tags/${tag}`}>#{tag}</Link>
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default TagsCard;
