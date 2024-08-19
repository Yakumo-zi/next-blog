import { cn } from "@/utils";

const Loading = () => {
  return (
    <>
      <div className="mb-2 flex animate-pulse gap-2">
        <div className="h-8 w-24 rounded-md bg-gray-300"></div>
        <div className="h-8 w-24 rounded-md bg-gray-300"></div>
        <div className="mb-2 flex flex-1 animate-pulse items-center justify-end gap-2">
          <div className="h-8 w-24 rounded-md bg-gray-300"></div>
          <div className="h-8 w-24 rounded-md bg-gray-300"></div>
          <div className="h-8 w-24 rounded-md bg-gray-300"></div>
        </div>
      </div>
      <div
        className={cn(
          "container flex h-[780px] min-w-full animate-pulse items-center justify-center rounded-lg bg-gray-300",
        )}
      >
        Loading...
      </div>
    </>
  );
};

export default Loading;
