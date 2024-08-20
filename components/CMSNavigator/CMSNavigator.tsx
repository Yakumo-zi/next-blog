import { cn } from "@/utils";
import Link from "next/link";
import { ComponentProps } from "react";

type Props = {} & ComponentProps<"div">;
const CMSNavigator = ({ className, ...props }: Props) => {
  const routes = ["dashboard", "admin"];
  return (
    <div
      className={cn(
        "flex h-full w-3/12 flex-col items-center justify-start gap-6 bg-amber-50 p-2 rounded-md",
        className,
      )}
      {...props}
    >
      <div className="flex min-h-24 w-full items-center justify-center bg-amber-100 rounded-lg select-none">
        <h1 className="text-center font-mono text-3xl font-bold antialiased  text-orange-600">
          CMS Navigator
        </h1>
      </div>
      <div className="flex w-full flex-col items-center justify-start gap-2">
        {routes.map((route) => {
          return (
            <Link
              href={route}
              key={route}
              className="flex w-full items-center justify-center rounded-md bg-amber-200 p-2 font-mono text-lg text-amber-900 transition-all ease-in-out hover:bg-amber-300"
            >
              {route.charAt(0).toUpperCase() + route.slice(1)}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CMSNavigator;
