import React from "react";
import Step from "./Step";
import { ListRestart } from "lucide-react";
import { setCurrentStep, updateFormData } from "../../redux/slices/onboardingStudentsSlice";
import { useDispatch } from "react-redux";
import { clearLocalStorage } from "../../lib/utils";

export default function Steps({ steps }) {
  const dispatch = useDispatch();
  const handleReset = () => {
    clearLocalStorage("formData")
    // dispatch(updateFormData({}));
    dispatch(setCurrentStep(1))
    window.location.reload()
  }

  return (
    <div className="rounded-lg relative col-span-full lg:col-span-4 bg-orange-600 p-10 flex flex-row justify-between md:flex-col md:justify-start gap-6 flex-wrap ">
      {steps.map((step, i) => {
        return <Step key={i} step={step} />;
      })}
      <div className="absolute -top-4 right-1  ">
      <button
          type="button"
          onClick={() => handleReset()}
          className="inline-flex w-full items-center justify-center p-1 px-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-orange-900 rounded-lg hover:bg-orange-800"
        >
          <ListRestart className="" />
        </button>
      </div>
    </div>
  );
}
