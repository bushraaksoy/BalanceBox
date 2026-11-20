import React from 'react';

const Amount = ({ amount }) => {
    return <div className="inline">{amount?.toLocaleString()}</div>;
};

export default Amount;
