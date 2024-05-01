import Link from "next/link";
import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full h-[5rem] border-2 p-5  ">
      <div className="flex items-center justify-between">
        <div>
          <Link href={"/"} className="mr-6">
            <div className="flex gap-2">
              <h1 className="text-2xl font-mono font-bold  underline underline-offset-8  decoration-green-500">
                &lt;/&gt;
              </h1>
            </div>
          </Link>
        </div>
        <span> Copyright © {currentYear} Rahul Raturi</span>
      </div>
    </div>
  );
};
