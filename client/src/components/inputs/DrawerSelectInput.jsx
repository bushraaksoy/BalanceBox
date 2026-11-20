import React from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import InputLabel from './InputLabel';

const DrawerSelectInput = ({
    label,
    type,
    name,
    id,
    placeholder,
    value,
    onChange,
    children,
}) => {
    return (
        <label className="w-full">
            <InputLabel>{label}</InputLabel>
            <div className=" flex justify-between items-center w-full border border-gray-300 p-4  bg-gray-50 rounded-xl text-sm outline-none text-black placeholder:text-gray-600">
                <select
                    className="w-full h-full appearance-none outline-none"
                    type={type}
                    name={name}
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                >
                    {children}
                </select>
                <FaChevronDown />
            </div>
        </label>
    );
};

export default DrawerSelectInput;
