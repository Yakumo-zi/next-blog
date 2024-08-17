import Link from "next/link";
import { getPagePosts, getPages } from "./actions";
import PostCard from "@/components/PostCard/PostCard";
import { cn } from "@/utils";

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
                "rounded-full bg-indigo-300 w-6 h-6 inline-flex justify-center items-center text-slate-900 hover:bg-indigo-400 transition-all ease-in-out",
                page === i ? "bg-purple-400" : ""
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
