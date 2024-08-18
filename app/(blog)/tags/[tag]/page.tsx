import { getPostsByTag } from "@/app/(blog)/actions";
import PostCard from "@/components/PostCard/PostCard";
import Tag from "@/components/UI/Tag";

const Page = async ({ params }: { params: { tag: string } }) => {
  const tag = decodeURIComponent(params.tag);
  const res = await getPostsByTag(tag);
  return (
    <div className=" container w-full h-full flex flex-col gap-2 mb-4">
      <div className="flex gap-2 shrink-0">
        <Tag className="p-2 bg-rose-300 hover:transform-none">#{tag}</Tag>
        <Tag className="p-2 bg-orange-300 hover:transform-none">
          Count:{res.length}
        </Tag>
      </div>
      <div className="w-full flex items-center justify-center flex-col gap-4 ">
        {res.map((pair) => {
          return (
            <PostCard
              key={pair.filename}
              meta={pair.meta}
              filename={pair.filename}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
