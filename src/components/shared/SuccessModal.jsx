import { CheckCircle, CheckCircle2, LucideThumbsUp, X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const SuccessModal = ({
  image,
  firstname,
  surname,
  othername,
  onclickModal,
}) => {
    const navigate = useNavigate();
  function handlePrint() {
    navigate("/print");
  }
  return (
    <div className="absolute p-9 sm:left-24 md:left-52 self-center rounded-lg border bg-white h-96 w-fit shadow-2xl z-50 lg:inset-auto ">
      <div className="">
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onclickModal}
        >
          <X />
        </div>  
        <div className="text-center">
          <h2 className="text-5xl font-bold text-emerald-500">Success!</h2>
          <p className="text-xl font-semibold text-emerald-400">
            Your registeration has been successfully submitted.
          </p>
        </div>

        <div className="flex justify-center flex-col items-center mt-1">
          <div className="text-center ">
            <CheckCircle size={100} className="text-emerald-500 text-4xl" />
          </div>
          <div className="text-2xl font-semibold capitalize">
            {surname.toUpperCase()} {firstname}, {othername}
          </div>
          <div className="">
            <LucideThumbsUp size={40} className="text-emerald-500" />
          </div>
          <div className="mt-2 flex items-center flex-col">
            <p className="font-bold text-sm leading-6 ml-2">
              Please proceed with the print button to get a print out.
            </p>
            <button
            type="button"
            onClick={handlePrint}
            className="bg-orange-900 text-white font-bold py-2 px-4 rounded"
          >
            Print
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
