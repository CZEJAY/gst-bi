import { useFormEventStore } from "../../context/zustand";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ToggleInput({
  label,
  name,
  data,
  register,
  className = "col-span-2 sm:col-span-1 flex flex-wrap border border-slate-300 ring-orange-300 rounded py-1 px-3",
  options = [],
  level = [],
  onSelectionChange = (options) => {}
}) {
  // @ts-ignore
  const formData = useSelector((store) => store.onboarding.formData)
  const [selectedOptions, setSelectedOptions] = useState(formData.courses || []);

  const handleChange = (id) => {
    setSelectedOptions((prevSelectedOptions) => {
      let updatedSelectedOptions;
      if (prevSelectedOptions.includes(id)) {
        updatedSelectedOptions = prevSelectedOptions.filter((option) => option !== id);
      } else {
        updatedSelectedOptions = [...prevSelectedOptions, id];
      }
      if (onSelectionChange) {
        onSelectionChange(updatedSelectedOptions);
      }
      return updatedSelectedOptions;
    });
  };
  const {data: zusData} = useFormEventStore()
  useEffect(() => {
    // setSelectedOptions(zusData || [])
    if(zusData.level.includes(level[1].id)){
      setSelectedOptions([options[0].id])
    } else if (zusData.level.includes(level[2].id)) {
      setSelectedOptions([])
      setSelectedOptions([options[1].id, ])
    } else if (zusData.level.includes(level[3].id)) {
      setSelectedOptions([])
      setSelectedOptions([options[1].id, options[0].id])
    }
  }, [zusData])
  return (
    <div className={`${className}`}>
      <div className="w-full">
        <h2 className="block text-sm font-medium leading-6 text-gray-900 ">
          {label}
        </h2>
        <p className="text-xs leading-tight mb-1">Note: the course selections are determined automatically by the system, based on the level of studies.</p>
      <hr className="mb-2" />
      </div>
      <div className="w-full flex-col flex md:flex-row gap-5 items-start">
      {options.map((item, i) => {
          return (
            <label key={i} htmlFor={item.id} className="relative inline-flex items-center cursor-pointer">
              <input
                id={item.id}
                name={item.id}
                checked={selectedOptions.includes(item.id)}
                onChange={() => handleChange(item.id)}
                type="checkbox"
                className="sr-only peer"
                aria-label={item.title}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-orange-300 rounded-full peer  peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-orange-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 ">
                {name && `${item.title}`}
              </span>
            </label>
          );
        })}
        
      </div>
    </div>
  );
}

