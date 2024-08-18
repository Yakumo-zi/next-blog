import { cn } from "@/utils";

const Loading = () => {
  return (
    <>
      <div className=" flex gap-2 animate-pulse mb-2">
        <div className="w-24 h-8 rounded-md bg-gray-300"></div>
        <div className="w-24 h-8 rounded-md bg-gray-300"></div>
        <div className="flex-1 flex animate-pulse mb-2 items-center justify-end gap-2 ">
            <div className="w-24 h-8 rounded-md bg-gray-300"></div>
            <div className="w-24 h-8 rounded-md bg-gray-300"></div>
            <div className="w-24 h-8 rounded-md bg-gray-300"></div>
        </div>
      </div>
      <div
        className={cn(
          "container flex items-center justify-center min-w-full h-[780px]  bg-gray-300 rounded-lg animate-pulse"
        )}
      >
        Loading...
      </div>
    </>
  );
};

export default Loading;
