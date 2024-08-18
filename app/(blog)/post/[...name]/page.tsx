import { getPostContent } from "@/app/(blog)/actions";
import BackToTop from "@/components/BackToTop/BackToTop";
import Tag from "@/components/UI/Tag";
import Link from "next/link";
import path from "path";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";

export default async function Page({ params }: { params: { name: string[] } }) {
  const name = path.join(...params.name);
  const res = await getPostContent(decodeURIComponent(name));
  return (
    <>
      <div className="flex mb-4">
        <div className="flex gap-2">
          {res?.meta.published && (
            <Tag className="bg-violet-50 hover:transform-none">
              {res.meta.published}
            </Tag>
          )}
          {res?.filename && (
            <Tag className="bg-violet-50 hover:transform-none">
              {res.filename.split(path.sep).slice(-1)[0].split(".")[0]}
            </Tag>
          )}
        </div>

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
        <article className="prose min-w-full prose-h1:text-center prose-img:rounded-md prose-img:mx-auto prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0">
          <Markdown
            remarkPlugins={[remarkGfm]}
            children={res?.content}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ margin: 0, borderRadius: "0.5rem" }}
                    children={String(children).replace(/\n$/, "")}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </article>
      </div>
      <BackToTop className="fixed bottom-4 right-10" />
    </>
  );
}
