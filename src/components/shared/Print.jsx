import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Print() {
  const formData = useSelector((store) => store.onboarding.formData);

  async function processData(event) {
    event.preventDefault();
    console.log(formData);
    // Handle the form data submission logic here
  }
  function handlePrint() {
    window.print()
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    window.print()
  }, [])

  return (
    <div>
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
        <div className="grid gap-4 sm:grid-cols-1">
          <div>
            <img src={formData.image} alt="user"  className="max-h-40" />
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
        {/* <NavButtons /> */}
      </form>
    </div>
  );
}
