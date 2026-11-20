import React from 'react';
import Currency from '../Currency';
import InputLabel from './InputLabel';

const AmountInput = ({
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
            <div className="amount w-full border border-gray-400 text-black py-3 text px-4 bg-white rounded-2xl flex ">
                <span className="px-1">
                    <Currency />
                </span>
                <input
                    type={type}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
            </div>
        </label>
    );
};

export default AmountInput;
