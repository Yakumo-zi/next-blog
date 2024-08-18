import { getPostContent } from "@/app/actions";
import Tag from "@/components/UI/Tag";
import Link from "next/link";

export default async function Page({ params }: { params: { name: string } }) {
  const res = await getPostContent(decodeURIComponent(params.name));
  return (
    <>
      <div className="flex my-4">
        {res?.meta.published && (
          <Tag className="bg-violet-50 hover:transform-none">
            {res.meta.published}
          </Tag>
        )}
        <div className="flex-1 flex justify-end gap-2">
          {res?.meta.tags && (
            <>
              {res.meta.tags.slice(0, 5).map((tag) => (
                <Link href={`/tags/${tag}`} key={tag}>
                  <Tag className=" bg-cyan-50">#{tag}</Tag>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="bg-slate-50 p-2 shadow-lg">
        <article className="prose min-w-full prose-h1:text-center prose-pre:bg-gray-900 prose-img:rounded-xl prose-img:mx-auto">
          {res?.content}
        </article>
      </div>
    </>
  );
}
