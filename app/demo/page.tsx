import React from "react";

const ProgessBar = ({ value = 0 }: { value: number }) => {
  return (
    <div className="p-5 flex justify-center items-center">
      <span className="h-[2rem] w-[80%] bg-gray-100 flex justify-center items-center rounded-full dark:text-black ">
        {value.toFixed()}%
      </span>
    </div>
  );
};

export default ProgessBar;
