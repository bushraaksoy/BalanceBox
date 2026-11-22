import React from 'react';
import { FaBell } from 'react-icons/fa';
import NavIcon from '../NavIcon';
import FullLogo from '../FullLogo';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';

const TopAppBar = () => {
    return (
        <div className="z-10 flex h-[55px] w-full shrink-0 items-center justify-between border-b border-stone-300 bg-white px-5 py-3">
            <FullLogo />
            <NavIcon to="/chat">
                <IoChatbubbleEllipsesSharp size={20} />
                {/* <FaBell size={20} /> */}
            </NavIcon>
        </div>
    );
};

export default TopAppBar;
