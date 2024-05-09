import { ScrollArea } from "@/components/ui/scroll-area";
import componentsData from "@/data/common/componentsData";
import socialsData from "@/data/common/socialsAccounts";
import Link from "next/link";

export default function List() {
  return (
    <div>
      <ScrollArea className="h-[100vh] w-[90%] rounded-md border">
        <div className="p-5">
          <span className="font-bold text-black dark:text-white">
            All Components
          </span>
          {componentsData.map((item, ind) => {
            return (
              <>
                <Link key={ind} href={`/components/${item.id}`}>
                  <div className="text-[1rem] mb-2 text-slate-500 hover:text-green-500 cursor-pointer hover:translate-x-2 mt-1">
                    {item.title}
                  </div>
                </Link>
              </>
            );
          })}
          <br />
          <br />
          <span className="font-bold text-black dark:text-white">
            Follow for more updates
          </span>
          {socialsData.map((item, ind) => {
            return (
              <>
                <Link key={ind} href={item.link} target="_blank">
                  <div className="text-[1rem] mb-2 text-slate-500 hover:text-green-500 cursor-pointer hover:translate-x-2 mt-1">
                    {item.label}
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
