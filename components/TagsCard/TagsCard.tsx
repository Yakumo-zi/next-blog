import { getTags } from "@/app/(blog)/actions";
import Tag from "../UI/Tag";
import Link from "next/link";
import { cn, randomColor } from "@/utils";
import { ComponentProps } from "react";
type Props = ComponentProps<"div">;
const TagsCard = async ({ className }: Props) => {
  let tags = await getTags();
  return (
    <div
      className={cn(
        " w-64 min-h-12 bg-stone-50 rounded-lg p-2 shadow-md flex flex-col justify-center items-center gap-2",
        className
      )}
    >
      <div className="w-full border-b-2 inline-flex justify-center items-center pb-2 select-none">
        All Tags
      </div>
      <div className="  flex flex-wrap justify-evenly gap-2">
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
