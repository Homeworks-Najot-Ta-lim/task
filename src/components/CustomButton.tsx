import React from 'react'
import { CustomButtonType } from '../types/CustomButtonType'

const CustomButton: React.FC<CustomButtonType> = ({ title, extraClass ,type,onClick}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${extraClass} bg-[#7CB305] text-white font-normal py-1 px-3 rounded-md cursor-pointer hover:scale-105 transition-transform duration-300`}
    >
      {title}
    </button>
  )
}

export default CustomButton
