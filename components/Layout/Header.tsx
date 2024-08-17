import Link from "next/link";
import { ComponentProps } from "react";

type Props = {} & ComponentProps<"div">;
export const Header = ({ ...props }: Props) => {
  return (
    <div
      className="container  min-h-20 flex justify-between items-center sticky "
      {...props}
    >
      <Link href={"/"} className=" font-bold text-xl">
        Yakumo's Blog
      </Link>
      <nav className="flex flex-[1] justify-end gap-3 ">
        <Link href={"/"} className="text-md hover:underline">
          Home
        </Link>
        <Link href={"/category"} className="text-md hover:underline">
          Category
        </Link>
        <Link href={"/about"} className="text-md hover:underline">
          About Me
        </Link>
        <Link
          href={"https://www.github.com/Yakumo-zi"}
          className="text-md hover:underline"
        >
          Github
        </Link>
      </nav>
    </div>
  );
};
