import Layout from "@/components/Layout";
import type { Metadata } from 'next'
import "./globals.css";
 
export const metadata: Metadata = {
  title: "Yakumo's blog",
}

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
