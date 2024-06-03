import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { updateFormData } from "../../redux/slices/onboardingStudentsSlice";

export default function SelectInputCourse({
  label,
  name,
  register,
  className = "col-span-2 sm:col-span-1 min-w-full",
  options = [],
  multiple = false,
}) {
  const dispatch = useDispatch()
  const formData = useSelector((store) => store.onboarding.formData)

  const handleChange = (e) => {
    const FDATA = {
      ...formData,
      level: e.target.value
    }
    dispatch(updateFormData(FDATA))
  }
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900  "
      >
        {label}
      </label>
      <div className="mt-2 w-full">
        <select
        // onChangeCapture={(e) => handleChange(e)}
          {...register(`${name}`)}
          id={name}
          multiple={multiple}
          name={name}
          className="block min-w-full rounded-md h-10 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-500 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
        >
          {options.map((option, i) => {
            return (
              <option key={i}  value={option.id} disabled={i === 0} defaultValue={i === 0} selected={i === 0}>
                {option.title}
              </option>
            );
          })}
        </select>
        
      </div>
    </div>
  );
}
