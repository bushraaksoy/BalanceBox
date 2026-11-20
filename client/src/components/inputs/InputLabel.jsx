import React from 'react';

const InputLabel = ({ children }) => {
    return (
        <div className="p-2 font-semibold text-xs flex items-center gap-1">
            {children}
        </div>
    );
};

export default InputLabel;
