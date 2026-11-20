import React from 'react';

const AuthButton = ({ children }) => {
    return (
        <button
            type="submit"
            className="cursor-pointer rounded-3xl p-3 w-full bg-yellow-500 font-bold text-sm hover:bg-yellow-400 | transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 active:bg-yellow-400"
        >
            {children}
        </button>
    );
};

export default AuthButton;
