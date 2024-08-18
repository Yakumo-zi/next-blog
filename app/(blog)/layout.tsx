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
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
