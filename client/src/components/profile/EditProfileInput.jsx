import React from 'react';

const EditProfileInput = ({ label, value, name, placeholder, onChange }) => {
    return (
        <label>
            {label}
            <input
                type="text"
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full border border-gray-200 p-3 bg-white rounded-xl mt-auto"
            />
        </label>
    );
};

export default EditProfileInput;
