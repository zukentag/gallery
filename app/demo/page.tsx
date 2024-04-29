"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface PaginationItem {
  title: string;
  description: string;
  thumbnail: string;
  // items?: Explorer[];
}

const Page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");

    const data = await res.json();

    if (data && data.products) {
      setData(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(data);
  return (
    <div>
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 p-5 items-center justify-center">
          {data
            .slice(page * 10 - 10, page * 10)
            .map((d: PaginationItem, ind: number) => {
              return (
                <div
                  key={ind}
                  className="flex-row gap-2 items-center justify-center text-center cursor-pointer"
                >
                  <div className="">
                    <Image
                      src={d.thumbnail}
                      height={500}
                      width={500}
                      className="flex h-[12rem] w-full object-cover"
                      alt={d.title}
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    {d.title}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Page;
