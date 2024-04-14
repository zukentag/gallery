"use client";

import React from "react";
import Link from "next/link";
import { ThreeDCardDemo } from "@/components/ui/3d-card_rotate";
import { usePathname } from "next/navigation";

const componentArray = ["1", "2", "3", "4"];

export default function Container() {
  const path = usePathname();
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">Cont</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center overflow-hidden">
        {componentArray.map((c, index) => (
          <Link key={index} href={`${path}/${c}`}>
            <>
              <ThreeDCardDemo />
            </>
          </Link>
        ))}
      </div>
    </div>
  );
}
