import React from 'react';

const SubHeading = ({ children, className = '' }) => {
    return (
        <div className={`font-medium pt-2 pb-4 ${className}`}>{children}</div>
    );
};

export default SubHeading;
