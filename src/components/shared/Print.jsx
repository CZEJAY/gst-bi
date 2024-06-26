import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Print() {
  const formData = useSelector((store) => store.onboarding.formData);
  const [isPrinting, setIsprinting] = useState(false);

  async function processData(event) {
    event.preventDefault();
    console.log(formData);
    // Handle the form data submission logic here
  }
  function handlePrint() {
    setIsprinting(true);
    setTimeout(() => {
      window.print();
      setIsprinting(false);
    }, 300)
  }

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   window.print()
  // }, [])

  return (
    <div className="w-screen   justify-center h-screen flex items-start relative">
        <button
          hidden={isPrinting}
          type="button"
          onClick={handlePrint}
          className="bg-orange-900 absolute bottom-5 right-5 text-orange-500 font-bold py-2 px-4 rounded"
        >
          Print
        </button>
      <form className=" w-full  relative px-5 py-3 max-w-[900px] max-h-[400px]  border-[4px]  border-orange-500">
        {/* MAKE A WATER MARK BACKGROUND WITH THE LOGO */}
        {/* <img
          className="absolute top-0 left-0 w-full h-full object-cover  opacity-20 
          bg-no-repeat bg-cover blur-lg bg-blend-screen bg-center  -z-30
          "
          src="/uniuyo-logo.png"
          alt="uniuyo-logo"
        /> */}

        <div className="mb-8 relative w-full flex items-center justify-center">
          <div className="mx-auto self-center">
            <img
              src={formData.image}
              alt="user"
              className="max-w-52 self-center"
            />
            <p className="text-xl text-center font-bold">
              {formData.matricNumber}
            </p>
          </div>
          <div className="flex flex-1 gap-4 -mt-8 items-center justify-end  shrink-0">
            <div className="flex-col -mt-9 text-center">
              <h1 className="text-[25px] tracking-widest mt-8  leading-5  uppercase font-bold text-gray-900">
                university of uyo
              </h1>
              <p className="text-lg tracking-tight mt-1 uppercase leading-tight font-bold">
                GST - Biometric Registration
              </p>
              <p className="text-md mt-1 uppercase leading-tight font-serif font-bold">
                second semester
              </p>
              <p className="text-sm uppercase font-serif font-bold">
                2023/2024 session
              </p>
            </div>
            <img src="/uniuyo-logo.png" alt="logo" className="w-32" />
          </div>
        </div>
        <div className="flex w-full -mt-6 flex-col">
          <div className="w-full flex items-center justify-between gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-xl font-bold w-full flex items-center border-b">
                Name:{" "}
                <span className="font-medium ml-auto text-sm">
                  {formData.surName.toUpperCase()},{" "}
                  {formData.firstName.toUpperCase()}{" "}
                  {formData.otherName.toUpperCase()} ({formData.gender})
                </span>
              </p>
              <p className="text-xl font-bold w-full flex items-center border-b">
                Faculty:{" "}
                <span className="font-medium ml-auto text-sm ">
                  {formData.faculty}
                </span>
              </p>
              <p className="text-xl font-bold w-full flex items-center border-b">
                Department:{" "}
                <span className="font-medium ml-auto text-sm">
                  {formData.department}
                </span>
              </p>
              <p className="text-xl font-bold w-full flex items-center border-b">
                Level:{" "}
                <span className="font-medium ml-auto text-sm">
                  {formData.level}
                </span>
              </p>
            </div>
            <div className="border-2 border-black rounded w-52 h-32 flex items-center justify-center">
              <img
                src={"/finger.png"}
                className="rounded-full w-36"
                width={90}
                alt="fingerprint"
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-center gap-4 mt-4 border-b border-orange-500">
            <p className="italic font-bold text-xl">
              Congratulations! See you on exam day.
            </p>
          </div>
        </div>
        {/* <NavButtons /> */}
      </form>
    </div>
  );
}
