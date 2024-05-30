"use client";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

interface StepsData {
  name: string;
  component: () => ReactElement;
  optional: boolean;
}
interface CheckoutStepperProps {
  stepsData: StepsData[];
}

const CheckoutComponentsData: StepsData[] = [
  {
    name: "Step 1",
    component: () => <div>This is Step 1 component</div>,
    optional: false,
  },
  {
    name: "Step 2",
    component: () => <div>This is Step 2 component</div>,
    optional: true,
  },
  {
    name: "Step 3",
    component: () => <div>This is Step 3 component</div>,
    optional: false,
  },
];
const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ stepsData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef<(HTMLDivElement | null)[]>([]);

  const ActiveComponenet = stepsData[currentStep - 1]
    ? stepsData[currentStep - 1].component
    : () => <></>;

  const calculateProgressWidth = () => {
    return ((currentStep - 1) / (stepsData.length - 1)) * 100;
  };

  useEffect(() => {
    setMargins({
      marginLeft: Number(stepRef.current[0]?.offsetWidth) / 2,
      marginRight:
        Number(stepRef.current[stepsData.length - 1]?.offsetWidth) / 2,
    });
    console.log(Number(stepRef.current[0]?.offsetWidth) / 2);
  }, [stepRef.current]);
  return (
    <div className=" p-5 flex flex-col">
      <div className=" flex justify-center items-center relative gap-[20%]">
        {stepsData.map((step, ind) => {
          return (
            <div
              key={step.name}
              ref={(el) => {
                stepRef.current[ind] = el;
              }}
              className="flex flex-col justify-center items-center gap-2 z-20"
            >
              <div
                className={`w-10 h-10 flex justify-center items-center rounded-full border-2 z-50 ${
                  currentStep === ind + 1
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : ""
                } ${
                  currentStep > ind + 1 || isCompleted
                    ? "bg-green-500 text-white "
                    : ""
                }`}
              >
                {currentStep > ind + 1 || isCompleted ? `✔` : ind + 1}
              </div>
              <div>{step.name}</div>
            </div>
          );
        })}

        <div
          className="absolute z-10 bg-gray-50 items-center h-2 top-5 "
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}%)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className={`h-full w-fit bg-green-500 transition duration-200 ease-in`}
            style={{ width: `${calculateProgressWidth()}%` }}
          ></div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-5">
        <ActiveComponenet />
      </div>
      <div className="flex mt-5 justify-around">
        {!isCompleted ? (
          <>
            <Button
              disabled={currentStep === 1}
              className={`w-20  `}
              onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
            >
              Previous
            </Button>
            <Button
              className="w-20"
              onClick={() => {
                setCurrentStep((prevStep) => {
                  if (prevStep === stepsData.length) {
                    setIsCompleted(true);
                    return prevStep;
                  } else {
                    return prevStep + 1;
                  }
                });
              }}
            >
              Next
            </Button>
          </>
        ) : (
          <>
            <Button
              className="w-20"
              onClick={() => {
                setCurrentStep(1);
                setIsCompleted(false);
              }}
            >
              Finish
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

const Stepper: React.FC = () => {
  return (
    <div className="w-full">
      <CheckoutStepper stepsData={CheckoutComponentsData} />
    </div>
  );
};

export default Stepper;
