"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

import Link from "next/link";
export const Navbar = () => {
  const navLinks = [
    {
      name: "Dev Gallery",
      href: "/",
    },
    {
      name: "Components",
      href: "/components",
    },
  ];

  return (
    <nav className="py-5 justify-between flex items-center sticky top-0 p-5 backdrop-blur-[3px] z-10 ">
      <div className="flex items-center">
        <Link href={navLinks[0].href} className="mr-6">
          <h1>{navLinks[0].name}</h1>
        </Link>

        <div className="flex">
          {navLinks.slice(1).map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={index !== navLinks.length - 2 ? "mr-6" : ""}
            >
              <h1>{link.name}</h1>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </nav>
  );
};
