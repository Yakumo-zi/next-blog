import { getContentByName, getPostContent } from "@/app/actions";
import BackToTop from "@/components/BackToTop/BackToTop";
import Tag from "@/components/UI/Tag";
import Link from "next/link";
import { redirect } from "next/navigation";
import path from "path";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import ZoomImage from "@/components/ZoomImage/ZoomImage";
import CopyButton from "@/components/UI/CopyButton";

export default async function Page({ params }: { params: { name: string } }) {
  const res = await getContentByName(decodeURIComponent(params.name));
  if (res == null) {
    redirect("/");
  }
  return (
    <>
      <div className="mb-4 flex">
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

        <div className="flex flex-1 justify-end gap-2">
          {res?.meta.tags && (
            <>
              {res.meta.tags.slice(0, 5).map((tag) => (
                <Link href={`/tags/${tag}`} key={tag}>
                  <Tag className="bg-cyan-50">#{tag}</Tag>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="bg-slate-50 p-2 shadow-lg">
        <article className="prose min-w-full prose-h1:text-center prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0 prose-img:mx-auto prose-img:rounded-md">
          <Markdown
            remarkPlugins={[remarkGfm]}
            children={res?.content}
            components={{
              p: "div",
              img: ({ node, ...props }) => {
                let postPath = res.path.split(path.sep).slice(1, -1).join("/");
                // get path last 2 elements
                let imgName = props.src?.split("/").slice(-2).join("/");
                let imgPath = "/" + postPath + "/" + imgName!;
                return (
                  <ZoomImage src={imgPath} alt={`${imgPath} load failed`} />
                );
              },
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <div className="relative">
                    <CopyButton code={String(children).replace(/\n$/, "")} />
                    <SyntaxHighlighter
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        borderRadius: "0.5rem",
                      }}
                      children={String(children).replace(/\n$/, "")}
                    />
                  </div>
                ) : (
                  <code
                    {...rest}
                    className="rounded-md bg-white px-2 text-red-600 before:content-[''] after:content-['']"
                  >
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
