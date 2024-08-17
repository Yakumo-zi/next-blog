import { getTags } from "@/app/actions";
import Tag from "../UI/Tag";
import Link from "next/link";
import { randomColor } from "@/utils";

const TagsCard = async () => {
  let tags = await getTags();
  return (
    <div className=" w-64 min-h-12 bg-slate-50 rounded-lg left-20 top-20 fixed p-2 shadow-md flex flex-col justify-center items-center gap-2">
      <div className="w-full border-b-2 inline-flex justify-center items-center pb-2 select-none">Tags Board</div>
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
