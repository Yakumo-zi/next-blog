import { cn } from "@/utils";

const Loading = () => {
  return (
    <div
      className={cn(
        "container min-w-full min-h-[800px] flex justify-center items-center rounded-sm "
      )}
    >
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 animate-pulse">
        {[...Array(5)].map((_, i) => {
          return (
            <div
              key={i}
              className="w-full h-36 bg-gray-300 rounded-lg animate-pulse"
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Loading;
