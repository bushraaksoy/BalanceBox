import React from 'react';
import UserAvatar from './UserAvatar';
import UserInformation from './UserInformation';
import { BiEditAlt } from 'react-icons/bi';
import NavIcon from '../NavIcon';

const UserProfileCard = ({ profile }) => {
    return (
        <div className="flex flex-col gap-3 items-center bg-white border border-gray-200 rounded-xl py-2 pb-8 relative">
            <NavIcon to="/edit-profile">
                <BiEditAlt size={22} className="absolute top-5 right-5" />
            </NavIcon>
            <UserAvatar name={profile?.fullname || profile?.username} />
            <UserInformation profile={profile} />
        </div>
    );
};

export default UserProfileCard;
