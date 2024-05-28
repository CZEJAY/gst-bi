
import { useFormEventStore } from "../../context/zustand";
import { updateFormData } from "../../redux/slices/onboardingStudentsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HelpCircle } from "lucide-react";
import Info from "../shared/info";

export default function TextInput({
  label,
  name,
  register,
  errors,
  isRequired = "",
  type = "text",
  className = "col-span-2 sm:col-span-1 ",
  defaultValue = "",
  isPhone = false,
  isPass = false,
}) {
  const formData = useSelector((store) => store.onboarding.formData);
  const dispatch = useDispatch()
  const { setData, data } = useFormEventStore();
  const handleChange = (value) => {
    setData({
      usePass: value,
    });
};
  useEffect(() => {
    if (isPass ) {
      const FData = { ...formData, password: formData.phone };
      dispatch(updateFormData(FData));
    }
  }, [data.usePass]);

  const handleInputChange = (e) => {
    if (isPhone) {
      setData({
        password: e.value,
      });
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between w-full">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900 "
        >
          {label}
        </label>
        {isPhone && (
          <div className=" inline-flex gap-2 cursor-pointer">
            <Info label="use phone number as password" />
            <label
              htmlFor={"isPassword"}
              className="relative inline-flex items-center cursor-pointer"
              title="use phone number as password"
            >
              <input
                // checked={}
                id="isPassword"
                onChange={(e) => handleChange(e.target.checked)}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-11 h-6 text-black bg-gray-200 peer-focus:outline-none peer-focus:ring-orange-300 rounded-full peer  peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        )}
      </div>
      <div className="mt-2">
        <input
          // onChange={(e) => handleInputChange(e.target)}
          {...register(`${name}`, { required: isRequired })}
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          autoComplete={name}
          className="block placeholder:pl-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-500 placeholder:text-gray-400  focus:ring-inset focus:ring-orange-700 dark:focus:ring-orange-500 sm:text-sm sm:leading-6 dark:bg-transparent pl-2"
          placeholder={`Type the ${label.toLowerCase()}`}
        />
        {errors[`${name}`] && (
          <span className="text-sm text-red-600 ">{
            errors[`${name}`].message
          }</span>
        )}
      </div>
    </div>
  );
}
