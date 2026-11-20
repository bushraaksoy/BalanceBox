import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router';

const ViewAllButton = ({ to }) => {
    return (
        <Link
            to={to}
            className="flex items-center justify-center gap-2 rounded-3xl p-1"
        >
            <span>View all</span>
            <FaArrowRightLong />
        </Link>
    );
};

export default ViewAllButton;
