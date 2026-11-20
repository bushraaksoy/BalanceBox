import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavIcon = ({ children, title, to, onClick }) => {
    const location = useLocation();
    const titleLower = title && title.toLowerCase();
    const pathname = location.pathname.slice(1);
    var color =
        pathname == '' && titleLower == 'home'
            ? 'text-yellow-500'
            : pathname == titleLower
            ? 'text-yellow-500'
            : 'text-stone-700';

    return (
        <Link
            onClick={onClick}
            to={to}
            // to={{ pathname: to }}
            className={`flex flex-col gap-1 items-center ${color} `}
        >
            <div>{children}</div>
            <p className="text-2xs">{title}</p>
        </Link>
    );
};

export default NavIcon;
