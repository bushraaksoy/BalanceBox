import React from 'react';
import { FaBell } from 'react-icons/fa';
import NavIcon from '../NavIcon';
import FullLogo from '../FullLogo';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';

const TopAppBar = () => {
    return (
        <div className="z-10 flex w-full shrink-0 items-center justify-between px-5 py-8">
            <FullLogo />
            <NavIcon to="/chat">
                <IoChatbubbleEllipsesSharp size={20} />
                {/* <FaBell size={20} /> */}
            </NavIcon>
        </div>
    );
};

export default TopAppBar;
