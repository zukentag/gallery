"use client";

import React from "react";
import Link from "next/link";
import { ThreeDCardDemo } from "@/components/ui/3d-card_rotate";
import { usePathname } from "next/navigation";

import componentArray from "@/data/common/componentsData";

export default function Container() {
  const path = usePathname();
  return (
    <div className="flex flex-col ">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center overflow-hidden">
        {componentArray.map((c, index) => {
          return (
            <Link key={index} href={`${path}/${c.id}`}>
              <>
                <ThreeDCardDemo
                  title={c.title}
                  description={c.description}
                  image={c.image}
                />
              </>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
