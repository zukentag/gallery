"use client";

import React, { useEffect, useState } from "react";
import { ThreeDCardDemo } from "@/components/ui/3d-card_rotate";
import { usePathname } from "next/navigation";

import axios from "axios";
import Link from "next/link";
import imageData from "@/data/common/imageData";

export default function Container() {
  const [containerData, setContainerData] = useState([]);
  const path = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/components");
        if (response) {
          setContainerData(response.data);
        }
      } catch (error) {
        console.log("error while fetching components data", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col h-[100vh] overflow-x-hidden  overflow-y-scroll no-scrollbar">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
        {containerData.map((c, index) => {
          const { id, title, description, image } = c;

          return (
            <Link key={index} href={`${path}/${id}`}>
              <>
                <ThreeDCardDemo
                  title={title}
                  description={description}
                  image={imageData[image]}
                />
              </>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
