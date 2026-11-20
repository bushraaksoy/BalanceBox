import React from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import NavIcon from '../NavIcon';
import BackButton from '../buttons/BackButton';

const SubpageAppBar = ({ title }) => {
    return (
        <div className="border-b border-stone-300 h-[55px] py-3 px-5 flex justify-between items-center bg-white | top-[env(safe-area-inset-top)] fixed right-0 w-full">
            <BackButton />
            <h1 className="text-lg font-medium">{title}</h1>
            <NavIcon>
                <HiOutlineDotsVertical size={20} />
            </NavIcon>
        </div>
    );
};

export default SubpageAppBar;
