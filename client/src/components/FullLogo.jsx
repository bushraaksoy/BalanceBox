import React from 'react';
import Logo from './Logo';

const FullLogo = () => {
    return (
        <div className="flex items-center ">
            <Logo width="30px" height="30px" />
            <h1 className="font-bold mt-1">BalanceBox</h1>
        </div>
    );
};

export default FullLogo;
