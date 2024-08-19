import { cn } from "@/utils";

const Loading = () => {
  return (
    <div
      className={cn(
        "container flex min-h-[800px] min-w-full items-center justify-center rounded-sm",
      )}
    >
      <div className="flex h-full w-full animate-pulse flex-col items-center justify-center gap-4">
        {[...Array(5)].map((_, i) => {
          return (
            <div
              key={i}
              className="h-36 w-full animate-pulse rounded-lg bg-gray-300"
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Loading;
