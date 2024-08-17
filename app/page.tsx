import Link from "next/link";
import { getPagePosts, getPages } from "./actions";
import PostCard from "@/components/PostCard/PostCard";
import { cn } from "@/utils";
import TagsCard from "@/components/TagsCard/TagsCard";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page as string) : 1;
  const res = await getPagePosts(page);
  const pages = await getPages();
  return (
    <div className="flex flex-col gap-4">
      {res.map(async (pair) => {
        return (
          <PostCard
            key={pair.filename}
            meta={pair.meta}
            filename={pair.filename}
          />
        );
      })}
      <div className="flex justify-center items-end gap-3">
        {Array.from({ length: pages }, (_, i) => i + 1).map((i) => {
          return (
            <Link
              className={cn(
                "rounded-full bg-violet-50 w-6 h-6 inline-flex justify-center items-center text-slate-900 hover:bg-violet-300 transition-all ease-in-out",
                page === i ? "bg-rose-300" : ""
              )}
              key={i}
              href={`?page=${i}`}
            >
              {i}
            </Link>
          );
        })}
      </div>
      <TagsCard />
    </div>
  );
}
