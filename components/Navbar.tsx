"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="py-10 flex justify-evenly items-center sticky top-0 ">
      <Link
        className={`link ${pathname === "/compress-image" && "active"}`}
        href="/compress-image"
      >
        <h1 className="text-2xl font-bold underline underline-offset-8 decoration-yellow-500">
          Compress Image
        </h1>
      </Link>
      <Link
        className={`link ${pathname === "/crop-image" && "active"}`}
        href="/crop-image"
      >
        <h1 className="text-2xl font-bold underline underline-offset-8 decoration-yellow-500  ">
          Crop Image
        </h1>
      </Link>
    </nav>
  );
};
