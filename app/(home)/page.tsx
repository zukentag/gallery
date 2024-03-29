import React from "react";
import { Navbar } from "./components/Navbar";

export default function page() {
  return (
    <div className="min-h-screen bg-black">
      <div className="dark:bg-black bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.2]">
        <div className="max-w-7xl mx-auto ">
          <Navbar />
        </div>
      </div>
    </div>
  );
}
