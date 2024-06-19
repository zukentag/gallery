import { ScrollArea } from "@/components/ui/scroll-area";
import socialsData from "@/data/common/socialsAccounts";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

export default async function List() {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/components");
        if (response) {
          setListData(response.data);
        }
      } catch (error) {
        console.log("error while fetching components data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ScrollArea className="h-[100vh] w-[90%] rounded-md border">
        <div className="p-5">
          <span className="font-bold text-black dark:text-white">
            All Components
          </span>
          {listData.map((item) => {
            const { title, id } = item;
            return (
              <>
                <Link key={id} href={`/components/${id}`}>
                  <div className="text-[1rem] mb-2 text-slate-500 hover:text-green-500 cursor-pointer hover:translate-x-2 mt-1">
                    {title}
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
