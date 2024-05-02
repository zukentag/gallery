"use client";
import React, { useState } from "react";
interface CheckBoxData {
  title: string;
  state: boolean;
  fields: string;
}

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const generatePassword = (checkBoxData: CheckBoxData[], len: number) => {
    let charSet = "",
      generatedPassword = "";

    const selectedOptions = checkBoxData.filter(
      (checkbox) => checkbox.state === true
    );

    if (selectedOptions.length === 0) {
      setError("Select atleast one option");
      setPassword("");
      return;
    }
    selectedOptions.forEach((opttion) => {
      charSet += opttion.fields;
    });

    for (let i = 0; i < len; i++) {
      const randomInd = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randomInd];
    }

    setPassword(generatedPassword);
    setError("");
  };

  return { password, error, generatePassword };
};

const PasswordGererator = () => {
  const { password, error, generatePassword } = usePasswordGenerator();
  const [len, setLen] = useState<number>(8);
  const [copied, setCopied] = useState<Boolean>(false);
  const [checkBoxData, setCheckBoxData] = useState([
    {
      title: "Uppercase Characters",
      state: false,
      fields: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    },
    {
      title: "Lowercase Characters",
      state: false,
      fields: "abcdefghijklmnopqrstuvwxyz",
    },
    {
      title: "Numeric Characters",
      state: false,
      fields: "0123456789",
    },
    {
      title: "Special Characters",
      state: false,
      fields: `!"#$%&'()*+,-./:;<=>?@[\]^_\`{|}~`,
    },
  ]);

  const handleCheckBoxStateChange = (ind: number) => {
    setCheckBoxData((prevState) =>
      prevState.map((item, index) =>
        index === ind ? { ...item, state: !item.state } : item
      )
    );
  };
  const handleClick = () => {
    generatePassword(checkBoxData, len);
  };
  return (
    <div className="p-2 border-2 bg-gray-100">
      {password && (
        <div className="flex justify-between items-center mb-2">
          <div className="text-2xl">{password}</div>
          <button
            className="p-2 border-2 bg-black text-white rounded"
            onClick={() => {
              setCopied(true);
              navigator.clipboard.writeText(password);

              setTimeout(() => {
                setCopied(false);
              }, 1000);
            }}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <div className="flex flex-col gap-1 items-center mb-2">
        <div className="flex text-left w-full gap-5">
          <label className="text-2xl ">Character Length : </label>
          <label className="text-2xl font-medium ">{len}</label>
        </div>
        <input
          className="w-full accent-green-500"
          type="range"
          name="charLen"
          id="charLen"
          min={6}
          max={50}
          value={len}
          onChange={(e) => {
            const value = Number(e.target.value);
            setLen(value);
          }}
        />
      </div>
      <div className="grid grid-cols-2 mb-2 gap-4">
        {checkBoxData.map((item, ind) => {
          return (
            <div key={ind} className="flex gap-4 items-center mb-1">
              <input
                className="h-5 w-5 accent-green-500"
                type="checkbox"
                onChange={() => handleCheckBoxStateChange(ind)}
                checked={item.state}
              />
              <span className="text-2xl">
                <label> {item.title}</label>
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col justify-center items-center mt-4">
        <button
          className="p-2 border-2 bg-black text-white rounded w-full"
          type="button"
          onClick={handleClick}
        >
          Generate Password
        </button>
        {error && <span className="text-red-500 mt-2">{error}</span>}
      </div>
    </div>
  );
};

export default PasswordGererator;
