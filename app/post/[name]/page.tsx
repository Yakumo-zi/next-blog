import { getPostContent } from "@/app/actions";
import Tag from "@/components/UI/Tag";

export default async function Page({ params }: { params: { name: string } }) {
  const res = await getPostContent(decodeURIComponent(params.name));
  return (
    <>
      <div className="flex my-4">
        {res?.frontmatter.published && (
          <Tag className="bg-violet-50 hover:transform-none">{res.frontmatter.published}</Tag>
        )}
        <div className="flex-1 flex justify-end gap-2">
          {res?.frontmatter.tags && (
            <>
              {res.frontmatter.tags.slice(0, 5).map((tag) => (
                <Tag className=" bg-cyan-50 hover:transform-none" key={tag}>
                  #{tag}
                </Tag>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="bg-slate-50 p-2 shadow-lg">
        <article className="prose lg:prose-md min-w-full prose-h1:text-center prose-pre:bg-gray-900">
          {res?.content}
        </article>
      </div>
    </>
  );
}
