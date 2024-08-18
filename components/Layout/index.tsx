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
    <div className="w-screen h-screen flex">
      <div className="flex-1 flex flex-col items-center pt-20 gap-4">
        <ProfileCard className="shrink-0 rounded-md" />
        <TagsCard tags={tags} className="shrink-0" />
      </div>
      <div
        className="container mx-auto max-w-5xl flex flex-col min-h-screen px-4 max-h-screen"
        {...props}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
      <div className="flex-1 flex flex-col items-center pt-20"></div>
    </div>
  );
};

export default Layout;
