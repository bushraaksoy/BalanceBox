import React from 'react';

const EditProfileDate = ({ label, value, name, placeholder, onChange }) => {
    return (
        <label>
            <div>{label}</div>
            <input
                type="date"
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full border border-gray-200 p-3 bg-white rounded-xl mt-auto"
            />
        </label>
    );
};

export default EditProfileDate;
