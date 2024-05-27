import axios from "axios";
import NavButtons from "../../../components/FormInputs/NavButtons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function FormConfirmation() {
  const formData = useSelector((store) => store.onboarding.formData);
  const [loading, setIsloading] = useState(false)

  async function processData(event) {
    event.preventDefault();
    console.log(formData);
    try {
      setIsloading(true)
     const response = await axios.post(import.meta.env.VITE_API_URL + "/register", formData)
     if(response){
      console.log(response)
      toast.success("Registered successfully!")
     }
    } catch (error) {
      if(error.response.data.msg){
        toast.error(error.response.data.msg)
      } else{
        toast.error("Something went wrong.")
      }
      console.log(error)
    } finally {
      setIsloading(false)
    }
  }
  const navigate = useNavigate()
  function handlePrint() {
    navigate("/print")
  }

  return (
    <div>
      <Toaster position="top-center"/>
      <form className="px-12 py-4" onSubmit={processData}>
        <div className="mb-8 relative">
          <h5 className="text-xl md:text-3xl font-bold text-gray-900">
            Confirm and Submit Data
          </h5>
          <p className="text-sm font-semibold">
            Confirm if this the Data that you filled
          </p>
          <button
            type="button"
            onClick={handlePrint}
            className="bg-orange-900 absolute top-0 right-0 text-white font-bold py-2 px-4 rounded"
          >
            Print
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <img src={formData.image} alt="user" className="" />
          </div>
          <div className="flex flex-col gap-1">
            {[
              { label: "Surname", value: formData.surName },
              { label: "Firstname", value: formData.firstName },
              { label: "Othername", value: formData.otherName },
              { label: "Email", value: formData.email },
              { label: "Gender", value: formData.gender },
              { label: "Phone", value: formData.phone },
              { label: "Faculty", value: formData.faculty },
              { label: "Department", value: formData.department },
              { label: "Level", value: formData.level },
              { label: "Matric Number", value: formData.matricNumber },
            ].map((item, index) => (
              <p key={index} className="text-sm font-bold w-full flex items-center border-b">
                {item.label}: <span className="font-medium ml-auto">{item.value}</span>
              </p>
            ))}
            <p className="text-sm font-bold w-full flex items-center border-b">
              Courses:{" "}
              <span className="font-medium ml-auto">
                {formData.courses.join(", ")}
              </span>
            </p>
            <p className="text-sm font-bold w-full flex items-center border-b">
              Password:{" "}
              <span className="font-medium ml-auto">{formData.password}</span>
            </p>
            <p className="text-sm font-bold w-full flex items-center border-b">
              Fingerprint:{" "}
              <img
                src={formData.fingerPrint}
                width={40}
                className="rounded-full ml-auto"
                alt="fingerprint"
              />
            </p>
          </div>
        </div>
        <NavButtons loading={loading} />
      </form>
    </div>
  );
}
