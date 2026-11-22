import React from 'react';
import { Link } from 'react-router-dom';

const NavIcon = ({ children, title, to, onClick }) => {
    return (
        <Link
            onClick={onClick}
            to={to}
            className="flex flex-col items-center gap-0.5 text-[#171717]"
        >
            <div>{children}</div>
            {title && <p className="text-2xs">{title}</p>}
        </Link>
    );
};

export default NavIcon;
