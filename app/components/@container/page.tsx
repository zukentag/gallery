"use client";
import React from "react";

import { ThreeDCardDemo } from "@/components/ui/3d-card_rotate";

export default function Container() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">Cont</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center overflow-hidden">
        <div
          onClick={(e) => {
            console.log("sa");
          }}
        >
          <ThreeDCardDemo />
        </div>
        <div>
          <ThreeDCardDemo />
        </div>
        <div>
          <ThreeDCardDemo />
        </div>
        <div>
          <ThreeDCardDemo />
        </div>
      </div>
    </div>
  );
}
