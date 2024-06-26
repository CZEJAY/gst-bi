import { updateFormData } from "../../redux/slices/onboardingStudentsSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Info from "../shared/info";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

export default function TextInput({
  label,
  name,
  register,
  errors,
  isRequired = "",
  type = "text",
  className = "col-span-2 sm:col-span-1",
  defaultValue = "",
  isPhone = false,
  isPass = false,
  placeholder,
  isUpper = false,
  formValues,
}) {
  const { watch } = useForm();
  const formData = useSelector((store) => store.onboarding.formData);
  const dispatch = useDispatch();
  const maxCharacter = 11;

  return (
    <div className={className}>
      <div className="flex items-center justify-between w-full">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        {/* {isPhone && (
          <div className="inline-flex gap-2 cursor-pointer">
            <Info label="Use phone number as password" />
            <label htmlFor="isPassword" className="relative inline-flex items-center cursor-pointer" title="Use phone number as password">
              <input
                id="isPassword"
                type="checkbox"
                className="sr-only peer"
                onChange={(e) => handleChange(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-orange-300 rounded-full peer  peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-orange-600"></div>
            </label>
          </div>
        )} */}
      </div>
      <div className="mt-2 relative">
        <input
          {...register(name, { required: isRequired })}
          maxLength={isPhone ? maxCharacter : undefined}
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          autoComplete={name}
          className={
            "block w-full  py-2 text-gray-900 placeholder:pl-2 shadow-sm ring-1 ring-inset ring-slate-500 placeholder:text-gray-400 focus:ring-inset focus:ring-orange-700 dark:focus:ring-orange-500 sm:text-sm sm:leading-6 dark:bg-transparent pl-1 placeholder:capitalize placeholder:pr-2 " +
            (isUpper && "uppercase")
          }
          placeholder={
            placeholder ? placeholder : `Type the ${label.toLowerCase()}`
          }
        />
        {isPhone && (
          <div className="absolute top-5 right-5 -translate-y-1/2 text-gray-400">
            {maxCharacter - formValues?.phone?.length} / {maxCharacter}
          </div>
        )}
        {errors[name] && (
          <span className="text-sm text-red-600">{errors[name].message}</span>
        )}
      </div>
    </div>
  );
}
