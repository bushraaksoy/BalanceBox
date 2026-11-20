import React from 'react';
import { FaHouse } from 'react-icons/fa6';
import { FaSackDollar } from 'react-icons/fa6';
import { FaFileAlt } from 'react-icons/fa';
import { IoMdAnalytics } from 'react-icons/io';
import { FaUserAlt } from 'react-icons/fa';
import NavIcon from '../NavIcon';
import { GiWallet } from 'react-icons/gi';

const BottomNavBar = () => {
    return (
        <div className="w-full border-t border-stone-300 px-5 pb-8 pt-3 flex justify-between bg-white | right-0 bottom-0 fixed">
            <NavIcon title="Home" to="/">
                <FaHouse size={20} />
            </NavIcon>
            <NavIcon title="Activity" to="/activity">
                <FaSackDollar size={20} />
            </NavIcon>
            {/* <NavIcon title="Savings" to="/savings">
                <FaSackDollar size={20} />
            </NavIcon> */}
            <NavIcon title="Budgeting" to="/budgeting">
                <GiWallet size={20} />
            </NavIcon>
            <NavIcon title="Analytics" to="/analytics">
                <IoMdAnalytics size={20} />
            </NavIcon>
            <NavIcon title="Account" to="/account">
                <FaUserAlt size={20} />
            </NavIcon>
        </div>
    );
};

export default BottomNavBar;
