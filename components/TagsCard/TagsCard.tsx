import { getTags } from "@/app/actions";
import Tag from "../UI/Tag";
import Link from "next/link";

const TagsCard = async () => {
  let tags = await getTags();
  return (
    <div className="w-64 min-h-12 bg-slate-100 rounded-lg left-20 top-20 fixed p-2 shadow-md flex flex-wrap justify-evenly">
      {tags.map((tag) => (
        <Tag key={tag} className={`m-1 cursor-pointer shrink-0`}>
          <Link href={`/tags/${tag}`}>#{tag}</Link>
        </Tag>
      ))}
    </div>
  );
};

export default TagsCard;
