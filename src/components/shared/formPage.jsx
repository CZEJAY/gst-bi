import React from "react";
import StepForm from "../../components/MultiStepForm/StepForm";
import Steps from "../../components/MultiStepForm/Steps";
import NavBar from "../navBar";

export default function FormPage() {
  const steps = [
    {
      number: 1,
      title: "Personal Info",
    },
    {
      number: 2,
      title: "Facial Authenticaion",
    },
    {
      number: 3,
      title: "Biometric Authentication",
    },
    {
      number: 4,
      title: "Submit and Confirmation",
    },
  ];
  return (
    <>
    <NavBar />
    <div className="p-4 relative overflow-hidden bg-orange-600 " >
      <div className="mx-auto w-full max-w-7xl  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 md:p-6 grid grid-cols-12 gap-4">
        {/* Steps */}
        <Steps steps={steps} />
        {/* Form */}
        <div className="rounded-lg col-span-full grid-cols-2 lg:col-span-8 ">
          <StepForm />
        </div>
      </div>
    </div>
    </>
  );
}
