import { getPostsByTag } from "@/app/actions";
import PostCard from "@/components/PostCard/PostCard";

const Page = async ({ params }: { params: { tag: string } }) => {
  const res = await getPostsByTag(decodeURIComponent(params.tag));
  return (
    <div className=" container w-full h-full flex items-center justify-center ">
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
  );
};

export default Page;
