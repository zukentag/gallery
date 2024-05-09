"use client";
import React, { useEffect, useState } from "react";

const Progress = ({
  value = 0,
  onComplete,
}: {
  value: number;
  onComplete: () => void;
}) => {
  const [percent, setPercent] = useState<number>(value);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    setPercent(Math.min(100, Math.max(0, value)));

    if (value >= 100) {
      setSuccess(true);
    }
  }, [value]);

  setInterval(() => {
    value += 1;
  }, 100);

  return (
    <div className="flex flex-col gap-6 ">
      <div className="p-5 flex justify-center items-center overflow-hidden ">
        <span className="h-[2rem] w-[50%] absolute bg-gray-100 flex justify-center items-center rounded-full dark:text-black overflow-hidden  ">
          <span
            className={`absolute z-50 ${
              parseFloat(percent.toFixed()) <= 49 ? "text-black" : "text-white"
            }`}
          >
            {percent.toFixed()}%
          </span>

          <div
            className="h-[2rem] left-0 absolute bg-green-500"
            style={{ width: `${percent.toFixed()}%` }}
          ></div>
        </span>
      </div>
      {success && (
        <div
          className="flex justify-center items-center"
          onClick={() => {
            onComplete();
            setSuccess(false);
          }}
        >
          <span className="p-2 scale-150 cursor-pointer">↻</span>
        </div>
      )}
    </div>
  );
};

const ProgessBar = () => {
  const [value, setValue] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    setInterval(() => {
      setValue((value) => value + 1);
    }, 100);
  }, []);

  return (
    <>
      <Progress
        value={value}
        onComplete={() => {
          setValue(0);
        }}
      />
    </>
  );
};

export default ProgessBar;
