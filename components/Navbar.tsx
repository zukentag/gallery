"use client";
import React, { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

import Link from "next/link";
export const Navbar = () => {
  const navLinks = [
    {
      name: "Gallery",
      href: "/",
      symbol: "</>",
    },
    {
      name: "Components",
      href: "/components",
    },
  ];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`py-5 justify-between flex items-center sticky top-0 p-5 z-10  ${
        isScrolled ? "backdrop-blur-[10px]" : ""
      }`}
    >
      <div className="flex items-center">
        <Link href={navLinks[0].href} className="mr-6">
          <div className="flex gap-2">
            <h1 className="text-2xl font-mono font-bold">
              {navLinks[0].symbol}
            </h1>
            <h1 className="hidden md:block md:text-2xl md:font-bold  text-green-500">
              {navLinks[0].name}
            </h1>
          </div>
        </Link>

        <div className="ml-10 flex items-center">
          {navLinks.slice(1).map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={index !== navLinks.length - 2 ? "mr-6" : ""}
            >
              <h1 className=" ">{link.name}</h1>
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
