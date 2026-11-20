import React from 'react';

const EditProfileInput = ({ label, value, name, placeholder, onChange }) => {
    return (
        <label className="block py-3">
            <div className="text-xs text-gray-500">{label}</div>
            <input
                type="text"
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full bg-transparent text-sm mt-1 outline-none"
            />
        </label>
    );
};

export default EditProfileInput;
