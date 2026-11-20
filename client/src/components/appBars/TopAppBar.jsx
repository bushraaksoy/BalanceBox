import React from 'react';
import { FaBell } from 'react-icons/fa';
import NavIcon from '../NavIcon';
import FullLogo from '../FullLogo';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';

const TopAppBar = () => {
    return (
        <div className=" z-10 border-b border-stone-300 h-[55px] py-3 px-5 flex justify-between items-center bg-white | top-[env(safe-area-inset-top)] fixed right-0 w-full">
            <FullLogo />
            <NavIcon to="/chat">
                <IoChatbubbleEllipsesSharp size={20} />
                {/* <FaBell size={20} /> */}
            </NavIcon>
        </div>
    );
};

export default TopAppBar;
