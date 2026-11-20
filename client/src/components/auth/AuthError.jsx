import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const AuthError = ({ children }) => {
    return (
        <div className="flex gap-2 p-3 items-center">
            <FaExclamationCircle color="#cb0000" />
            <p className="text-red-500 text-sm text-left">{children}</p>
        </div>
    );
};

export default AuthError;
