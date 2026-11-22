import React from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import NavIcon from '../NavIcon';
import BackButton from '../buttons/BackButton';

const SubpageAppBar = ({ title }) => {
    return (
        <div className="flex w-full shrink-0 items-center justify-between px-5 py-8">
            <BackButton />
            <h1 className="text-lg font-medium">{title}</h1>
            <NavIcon>
                <HiOutlineDotsVertical size={20} />
            </NavIcon>
        </div>
    );
};

export default SubpageAppBar;
