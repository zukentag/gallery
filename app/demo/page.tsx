"use client";
import React, { ReactElement, useState } from "react";
import components from "../components/page";
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

  return (
    <div className=" p-5 flex flex-col">
      <div className=" flex justify-center items-center gap-[20%]">
        {stepsData.map((step, ind) => {
          return (
            <div
              key={step.name}
              className="flex flex-col justify-center items-center gap-2"
            >
              <div
                className={`w-10 h-10 flex justify-center items-center rounded-full border-2 z-10 ${
                  currentStep === ind + 1
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : ""
                }`}
              >
                {ind + 1}
              </div>
              <div>{step.name}</div>
            </div>
          );
        })}
      </div>
      <div className="flex mt-5 justify-around">
        <Button
          disabled={currentStep === 1 || currentStep === stepsData.length}
          className={`w-20 ${
            currentStep === 1 || currentStep === stepsData.length
              ? "opacity-0"
              : ""
          }`}
          onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
        >
          Previous
        </Button>

        <Button
          className="w-20"
          onClick={() => {
            if (currentStep <= stepsData.length) {
              setCurrentStep((prevStep) => prevStep + 1);
            } else {
              setCurrentStep(1);
            }
          }}
        >
          {currentStep === stepsData.length ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

const Stepper: React.FC = () => {
  return (
    <div>
      <CheckoutStepper stepsData={CheckoutComponentsData} />
    </div>
  );
};

export default Stepper;
