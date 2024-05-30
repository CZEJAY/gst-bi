import { useFormEventStore } from "../../context/zustand";
import { updateFormData } from "../../redux/slices/onboardingStudentsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Info from "../shared/info";

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
}) {
  const formData = useSelector((store) => store.onboarding.formData);
  const dispatch = useDispatch();
  const { setData, data } = useFormEventStore();

  // Handle the change of the checkbox
  const handleChange = (value) => {
    setData({ usePass: value });
  };

  // Update the password in the formData when usePass changes and is true
  // useEffect(() => {
  //   if (isPass && data.usePass) {
  //     const updatedData = { ...formData, password: formData.phone };
  //     dispatch(updateFormData(updatedData));
  //   }
  // }, [data.usePass, formData.phone, dispatch, isPass]);

  // Handle the change of the phone number input
  const handleInputChange = (e) => {
    const { value } = e.target;
    if (isPhone) {
      setData({ phone: value });

      // If usePass is true, update the password with the phone number in real-time
      if (data.usePass) {
        const updatedData = { ...formData, phone: value, password: value };
        dispatch(updateFormData(updatedData));
      } else {
        const updatedData = { ...formData, phone: value };
        dispatch(updateFormData(updatedData));
      }
    } else {
      const updatedData = { ...formData, [name]: value };
      dispatch(updateFormData(updatedData));
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between w-full">
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
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
      <div className="mt-2">
        <input
          {...register(name, { required: isRequired })}
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          autoComplete={name}
          className="block w-full py-2 text-gray-900 placeholder:pl-2 shadow-sm ring-1 ring-inset ring-slate-500 placeholder:text-gray-400 focus:ring-inset focus:ring-orange-700 dark:focus:ring-orange-500 sm:text-sm sm:leading-6 dark:bg-transparent pl-2"
          placeholder={`Type the ${label.toLowerCase()}`}
        />
        {errors[name] && <span className="text-sm text-red-600">{errors[name].message}</span>}
      </div>
    </div>
  );
}
