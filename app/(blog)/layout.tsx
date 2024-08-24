import Layout from "@/components/Layout";
import type { Metadata } from "next";
import "../globals.css";
import { Bounce, ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
