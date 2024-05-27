import { setCurrentStep } from "../../redux/slices/onboardingStudentsSlice";
import { ChevronLast, ChevronLeft, ChevronRight, Loader } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
export default function NavButtons({loading=false}) {
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const dispatch = useDispatch();
  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }
  return (
    <div className="flex justify-between items-center">
      {currentStep > 1 && (
        <button
          onClick={handlePrevious}
          type="button"
          className="inline-flex items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-orange-900 rounded-lg focus:ring-4 focus:ring-orange-200 dark:focus:ring-orange-900 hover:bg-orange-800 "
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>
      )}
      <button
        type="submit"
        className="inline-flex items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-orange-900 rounded-lg focus:ring-4 focus:ring-orange-200 dark:focus:ring-orange-900 hover:bg-orange-800 "
      >
        <span>
          {currentStep === 4 ? "Confirm and Submit" : "Save and Continue"}
        </span>
        {
          loading ? <Loader className="animate-spin h-5 w-5 ml-2" /> : <ChevronRight className="w-5 h-5 ml-2" />
        }
      </button>
    </div>
  );
}
