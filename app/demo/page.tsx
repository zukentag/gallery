"use client";

import React, {
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const OTP = ({
  length,
  onSubmitFunction,
}: {
  length: number;
  onSubmitFunction: (otp: string) => string;
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [succeess, setSucceess] = useState(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, ind: number) => {
    const val: string = e.target.value;

    if (isNaN(parseInt(val))) {
      return;
    }

    const newOtp = [...otp];
    newOtp[ind] = val.charAt(val.length - 1);
    setOtp(newOtp);

    const comBinedOtp = newOtp.join("");

    if (comBinedOtp.length === length) {
      onSubmitFunction(comBinedOtp);
      setSucceess(true);
      setTimeout(() => {
        setSucceess(false);
        setOtp(new Array(4).fill(""));
      }, 2000);
    }

    if (val && ind < length - 1 && inputRefs.current[ind + 1]) {
      inputRefs.current[ind + 1].focus();
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, ind: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[ind] = "";
      setOtp(newOtp);
      if (ind > 0 && otp[ind - 1] && inputRefs.current[ind - 1]) {
        inputRefs.current[ind - 1].focus();
      }
    }
  };
  const handleClick = (ind: number) => {
    inputRefs.current[ind].setSelectionRange(1, 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 flex flex-col justify-center items-center gap-8 "
    >
      <div className="flex gap-4 ">
        {otp.map((_, ind) => {
          return (
            <input
              type="text"
              key={ind}
              ref={(input) => {
                if (input) {
                  inputRefs.current[ind] = input;
                }
              }}
              value={otp[ind]}
              onChange={(e) => handleChange(e, ind)}
              onClick={() => handleClick(ind)}
              onKeyDown={(e) => handleKeyDown(e, ind)}
              className="border-2 w-[4rem] h-[4rem] focus:text-green-500 flex justify-center items-center text-center"
            />
          );
        })}
      </div>
      <button type="submit" className="w-[12rem] h-[2rem] bg-black text-white">
        {succeess ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

const page = () => {
  const onSubmitFunction = (otp: string) => {
    console.log("Success", otp);
    return "Success";
  };
  return <OTP length={4} onSubmitFunction={onSubmitFunction} />;
};

export default page;
