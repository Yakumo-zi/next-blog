import { ComponentProps } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
type Props = ComponentProps<"div">;
const Layout = ({ children, ...props }: Props) => {
  return (
    <div
      className="container mx-auto max-w-5xl flex flex-col min-h-screen px-4"
      {...props}
    >
      <Header />
      <main>

      {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
