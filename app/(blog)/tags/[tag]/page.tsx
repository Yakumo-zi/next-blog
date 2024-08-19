import { getPostsByTag } from "@/app/(blog)/actions";
import PostCard from "@/components/PostCard/PostCard";
import Tag from "@/components/UI/Tag";

const Page = async ({ params }: { params: { tag: string } }) => {
  const tag = decodeURIComponent(params.tag);
  const res = await getPostsByTag(tag);
  return (
    <div className="container mb-4 flex h-full w-full flex-col gap-2">
      <div className="flex shrink-0 gap-2">
        <Tag className="bg-rose-300 p-2 hover:transform-none">#{tag}</Tag>
        <Tag className="bg-orange-300 p-2 hover:transform-none">
          Count:{res?.length}
        </Tag>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        {res?.map((pair) => {
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
