import React from 'react';
import Logo from '../components/Logo';
import { Link } from 'react-router';

const AuthLayout = ({
    children,
    title,
    subtitle,
    linkMessage,
    linkText,
    linkTo,
}) => {
    return (
        <div className="height-full px-7 py-10 flex flex-col gap-10 text-center">
            <Logo width="150px" height="150px" className="mx-auto" />
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
