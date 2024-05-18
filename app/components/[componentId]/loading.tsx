import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="flex gap-5 pl-10 pr-10 h-screen">
        <Skeleton className="h-[80vh] w-[25vw] rounded-xl" />
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-10 w-[60vw]" />
            <Skeleton className="h-8 w-[40vw]" />
          </div>
          <Skeleton className="h-[50vh] w-[60vw] rounded-xl" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-8 w-[40vw]" />
          </div>
        </div>
      </div>
    </>
  );
}
