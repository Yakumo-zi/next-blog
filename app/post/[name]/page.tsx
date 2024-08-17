import { getPostContent } from "@/app/actions";
import Tag from "@/components/UI/Tag";

export default async function Page({ params }: { params: { name: string } }) {
  const res = await getPostContent(decodeURIComponent(params.name));
  return (
    <>
      <div className="flex my-4">
        {res?.frontmatter.published && (
          <span className="px-2 bg-slate-300 rounded-lg text-zinc-600">
            {res.frontmatter.published}
          </span>
        )}
        <div className="flex-1 flex justify-end gap-1">
          {res?.frontmatter.tags && (
            <>
              {res.frontmatter.tags.slice(0, 5).map((tag) => (
                <Tag key={tag}>#{tag}</Tag>
              ))}
            </>
          )}
        </div>
      </div>
      <div>
        <article className="prose prose-slate lg:prose-md min-w-full">
          {res?.content}
        </article>
      </div>
    </>
  );
}
