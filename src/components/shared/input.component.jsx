import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import React from "react";

const InputBox = ({ name, type, id, value, placeholder, icon, disabled }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-[100%] mb-4">
      <input
        disabled={disabled}
        type={type === "password" && showPassword ? "text" : type}
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        className="input-box disabled:opacity-80"
        required
      />
      {icon === "password" && !showPassword && (
        <EyeIcon
          onClick={() => setShowPassword(!showPassword)}
          size={18}
          className="input-icon left-[auto] right-4 cursor-pointer"
        />
      )}
      {icon === "password" && showPassword && (
        <EyeOff
          onClick={() => setShowPassword(!showPassword)}
          size={18}
          className="input-icon left-[auto] right-4 cursor-pointer"
        />
      )}
    </div>
  );
};

export default InputBox;
