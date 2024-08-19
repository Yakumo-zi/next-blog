import CategoryPostList from "@/components/Category/CategoryPostList";
import { getCategories, getPostsByCategory, type BlogPost } from "../actions";
import Tag from "@/components/UI/Tag";

const Page = async () => {
  let categories = await getCategories();
  let fileList = new Map<string, Array<BlogPost>>();
  let promiseArray: Promise<void>[] = [];
  categories.forEach((category: string) => {
    async function getPosts() {
      let res = (await getPostsByCategory(category)) ?? [];
      if (fileList.has(category)) {
        let temp = fileList.get(category);
        temp?.concat(res);
      } else {
        fileList.set(category, res);
      }
    }
    promiseArray.push(getPosts());
  });
  await Promise.all(promiseArray);
  return (
    <div className="container flex h-full w-full flex-col gap-2">
      <div className="flex shrink-0 gap-2">
        <Tag className="bg-purple-300 p-2 hover:transform-none">Categories</Tag>
        <Tag className="bg-orange-300 p-2 hover:transform-none">
          Count:{categories.length}
        </Tag>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        {fileList.size > 0 &&
          Array.from(fileList.entries()).map(([category, posts]) => {
            return (
              <CategoryPostList
                key={category}
                category={category}
                fileList={posts}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Page;
