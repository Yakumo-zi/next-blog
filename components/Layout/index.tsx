import { ComponentProps } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import ProfileCard from "../ProfileCard/ProfileCard";
import TagsCard from "../TagsCard/TagsCard";
import { getTags } from "@/app/(blog)/actions";
type Props = ComponentProps<"div">;
const Layout = async ({ children, ...props }: Props) => {
  const tags = await getTags();
  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-1 flex-col items-center gap-4 pt-20">
        <ProfileCard className="shrink-0 rounded-md" />
        <TagsCard tags={tags} className="shrink-0" />
      </div>
      <div
        className="container mx-auto flex max-h-screen min-h-screen max-w-5xl flex-col px-4"
        {...props}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
      <div className="flex flex-1 flex-col items-center pt-20"></div>
    </div>
  );
};

export default Layout;
