"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface PaginationItem {
  title: string;
  description?: string;
  thumbnail?: string;
}

const demoData = [
  { title: "A", description: "A" },
  { title: "B", description: "B" },
  { title: "C", description: "C" },
  { title: "D", description: "D" },
  { title: "E", description: "E" },
  { title: "F", description: "F" },
  { title: "G", description: "G" },
];

const Pagination = ({
  paginationData,
}: {
  paginationData: PaginationItem[] | null;
}) => {
  const [data, setData] = useState<PaginationItem[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(3);

  useEffect(() => {
    if (paginationData && paginationData.length !== 0) {
      setData(paginationData);
      setTotalPage(Math.ceil(paginationData.length / limit));
    } else {
      setData(demoData);
      setTotalPage(Math.ceil(demoData.length / limit));
    }
  }, [paginationData, limit]);

  return (
    <div>
      {data && (
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-10 p-5 items-center justify-center`}
        >
          {data
            .slice((page - 1) * limit, page * limit)
            .map((d: PaginationItem, ind: number) => {
              return (
                <div
                  key={ind}
                  className="flex-row gap-2 items-center justify-center text-center cursor-pointer border-solid border-2 p-2"
                >
                  {d.thumbnail && (
                    <Image
                      src={d.thumbnail}
                      height={500}
                      width={500}
                      className="flex h-[12rem] w-full object-cover"
                      alt={d.title}
                    />
                  )}

                  <div className="text-2xl mt-1">{d.title}</div>
                </div>
              );
            })}
        </div>
      )}
      {data && data.length > 0 && (
        <div className="flex justify-center items-center gap-3 cursor-pointer h-[5rem] w-full">
          <span
            className={`hover:text-green-500 p-2  ${
              page === 1 ? " hidden  " : ""
            }`}
            onClick={() => {
              const newPage = page - 1;
              if (newPage >= 1 && newPage <= totalPage) {
                setPage(newPage);
              }
            }}
          >
            ◀ Previous
          </span>
          {[...Array(totalPage)].map((_, ind) => {
            return (
              <span
                key={ind}
                className={`hover:text-green-500 hover:border-solid hover:border-2 p-2 ${
                  page === ind + 1
                    ? "text-green-500 border-solid border-2  "
                    : ""
                }`}
                onClick={() => {
                  setPage(ind + 1);
                }}
              >
                {ind + 1}
              </span>
            );
          })}

          <span
            className={`hover:text-green-500 p-2  ${
              page === totalPage ? " hidden  " : ""
            }`}
            onClick={() => {
              const newPage = page + 1;
              if (newPage >= 1 && newPage <= totalPage) {
                setPage(newPage);
              }
            }}
          >
            Next ▶
          </span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
