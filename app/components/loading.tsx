import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="flex gap-5 pl-10 pr-10 h-screen">
        <Skeleton className="h-[80vh] w-[25vw] rounded-xl" />
        <div className="grid grid-cols-2 gap-5 mx-auto mb-20">
          <Skeleton className="h-[35vh] w-[30vw] rounded-xl" />
          <Skeleton className="h-[35vh] w-[30vw] rounded-xl" />
          <Skeleton className="h-[35vh] w-[30vw] rounded-xl" />
          <Skeleton className="h-[35vh] w-[30vw] rounded-xl" />
        </div>
      </div>
    </>
  );
}
