import React from 'react';
import AuthError from './AuthError';

const AuthInput = ({ name, type, value, onChange, placeholder, error }) => {
    return (
        <div>
            <input
                className="bg-gray-200 rounded-3xl py-3 px-4 w-full focus:ring-2 ring-yellow-500 outline-none"
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                autoComplete="off"
                required
            />
            {error && <AuthError>{error}</AuthError>}
        </div>
    );
};

export default AuthInput;
