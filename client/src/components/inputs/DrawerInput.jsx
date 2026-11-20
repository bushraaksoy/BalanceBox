import React from 'react';
import InputLabel from './InputLabel';

const DrawerInput = ({
    label,
    type,
    name,
    id,
    placeholder,
    value,
    onChange,
}) => {
    return (
        <label className="w-full">
            <InputLabel>{label}</InputLabel>
            <input
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className="w-full border border-gray-300 bg-gray-50 rounded-xl text-sm p-4 outline-none text-black placeholder:text-gray-600"
            />
        </label>
    );
};

export default DrawerInput;
