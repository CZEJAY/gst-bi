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
    <div className="w-full justify-center   flex items-center ">
      <form className=" w-full p-1 max-w-[700px] border-[15px] border-dotted border-orange-500" >
        <div className="px-12  relative py-4 border border-orange-700">
          {/* MAKE A WATER MARK BACKGROUND WITH THE LOGO */}
          <img className="absolute top-0 left-0 w-full h-full object-cover  opacity-20 
          bg-no-repeat bg-cover blur-md bg-blend-screen bg-center  -z-30
          "
            src="/uniuyo-logo.png"
            alt="uniuyo-logo"
          />

        <div className="mb-8 relative w-full flex items-center justify-center flex-col">
          <img src="/uniuyo-logo.png" alt="logo" className="w-40" />
          <h5 className="text-2xl leading-10 uppercase  md:text-3xl font-bold text-gray-900">
            university of uyo
          </h5>
          <p className="text-xl uppercase font-semibold">
            Uniuyo GST [first semester]
          </p>
        </div>
        <div className="flex w-full  flex-col">
          <div className="mx-auto">
            <img src={formData.image} alt="user"  className="max-w-40" />
            <p className="text-2xl text-center font-bold">
               {formData.matricNumber}
            </p>
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
            ].map((item, index) => (
              <p key={index} className="text-xl font-bold w-full flex items-center border-b">
                {item.label}: <span className="font-medium ml-auto">{item.value}</span>
              </p>
            ))}
            <p className="text-xl font-bold w-full flex items-center border-b">
              Courses:{" "}
              <span className="font-medium ml-auto">
                {formData.courses.join(", ")}
              </span>
            </p>
            <p className="text-xl font-bold w-full flex items-center border-b">
              Password:{" "}
              <span className="font-medium ml-auto">{formData.password}</span>
            </p>
            <p className="text-xl font-bold w-full flex items-center border-b">
              Fingerprint:{" "}
              <img
                src={formData.fingerPrint}
                width={40}
                className="rounded-full ml-auto"
                alt="fingerprint"
              />
            </p>
          </div>

          {/* FOOTER */}
          <div className="flex justify-center gap-4 mt-4 border-b border-orange-500">
            <p className="italic font-bold text-xl">Please endeavor to come with this to exams,</p>
          </div>
        </div>
        {/* <NavButtons /> */}
        </div>
      </form>
    </div>
  );
}
