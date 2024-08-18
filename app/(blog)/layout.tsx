import Layout from "@/components/Layout";
import type { Metadata } from "next";
import "./globals.css";
import TagsCard from "@/components/TagsCard/TagsCard";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

export const metadata: Metadata = {
  title: "Yakumo's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="w-screen h-screen flex">
          <div className="flex-1 flex flex-col items-center pt-20 gap-4">
            <ProfileCard className="shrink-0 rounded-md" />
            <TagsCard className="shrink-0" />
          </div>
          <Layout>{children}</Layout>

          <div className="flex-1 flex flex-col items-center pt-20">
          </div>
        </div>
      </body>
    </html>
  );
}
