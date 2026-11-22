import React from 'react';
import Logo from '../components/Logo';
import { Link } from 'react-router';
import useStatusBar from '../hooks/useStatusBar';

const AuthLayout = ({
    children,
    title,
    subtitle,
    linkMessage,
    linkText,
    linkTo,
}) => {
    useStatusBar('auth');
    return (
        <div className="app bg-[#F8F9FB] px-7 py-10 flex flex-col gap-10 text-center">
            <Link
                to="/"
                aria-label="Back to BalanceBox"
                className="self-center"
            >
                <Logo width="150px" height="150px" />
            </Link>
            <div>
                <h1 className="font-bold text-lg">{title}</h1>
                <p className="text-sm text-gray-600">{subtitle}</p>
            </div>
            {children}
            <div className="text-sm">
                {linkMessage}{' '}
                <Link to={linkTo} className="text-yellow-500 mt-full">
                    {linkText}
                </Link>
            </div>
        </div>
    );
};

export default AuthLayout;
