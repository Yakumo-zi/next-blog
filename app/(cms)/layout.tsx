import CMSNavigator from "@/components/CMSNavigator/CMSNavigator";
import { Metadata } from "next";
import "@/app/globals.css";
export const metadata: Metadata = {
  title: "Yakumo's cms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex h-screen w-screen gap-2 p-2">
          <CMSNavigator />
          <div className="mx-auto  w-full rounded-lg bg-amber-50 p-2">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
