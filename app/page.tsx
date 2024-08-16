import { getPostLists } from "./actions";
import PostCard from "@/components/PostCard";

export default async function Home() {
  let res = await getPostLists();
  return (
    <div className="flex flex-col gap-4">
      {res.map((filename) => (
        <PostCard key={filename} filename={filename} />
      ))}
    </div>
  );
}
