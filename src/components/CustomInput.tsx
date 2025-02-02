import { Input } from "antd";
import React from "react";
import { CustomInputType } from "../types/InputType";


const CustomInput: React.FC<CustomInputType> = ({ extraClass = "", name, size, placeholder, type, onChange,value }) => {
  return type === "password" ? (
    <Input.Password
      required
      name={name}
      onChange={onChange}
      className={`${extraClass}text-[#FFFFFF]`}
      size={size}
      placeholder={placeholder}
      value={value}
    />
  ) : (
    <Input
      required
      name={name}
      onChange={onChange}
      className={`${extraClass} text-[#FFFFFF]`}
      size={size}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};

export default CustomInput;
