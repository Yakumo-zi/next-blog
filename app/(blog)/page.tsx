import Link from "next/link";
import { getPagePosts, getPages } from "../actions";
import PostCard from "@/components/PostCard/PostCard";
import { cn } from "@/utils";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let page = searchParams?.page ? parseInt(searchParams.page as string) : 1;
  const pages = await getPages();
  if (page > pages || page < 1) {
    page = 1;
  }
  const res = await getPagePosts(page);
  return (
    <div className="flex flex-col gap-4">
      {res?.slice(0, 5).map(async (pair) => {
        return (
          <PostCard
            key={pair.filename}
            meta={pair.meta}
            filename={pair.filename}
          />
        );
      })}
      <div className="flex items-end justify-center gap-3">
        {Array.from({ length: pages }, (_, i) => i + 1).map((i) => {
          return (
            <Link
              className={cn(
                "inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-50 text-slate-900 transition-all ease-in-out hover:bg-violet-300",
                page === i ? "animate-bounce bg-rose-300" : "",
              )}
              key={i}
              href={`?page=${i}`}
            >
              {i}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
