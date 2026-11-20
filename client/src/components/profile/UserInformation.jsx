import React from 'react';
import NavIcon from '../NavIcon';
import { profileIcons } from '../../constants/constants';

const UserInformation = ({ profile }) => {
    console.log(profile);
    return (
        <div className="w-full px-5 pb-6 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
                {profileIcons.map(({ key, label, icon }) => (
                    <>
                        {profile?.[key] && key !== 'dob' && (
                            <div key={key} className="flex gap-2 items-end">
                                <NavIcon>{icon}</NavIcon>
                                <div className="user-detail flex flex-col">
                                    <div className="text-gray-700 text-xs">
                                        {label}
                                    </div>
                                    <div className="font-medium text-md">
                                        {profile?.[key]}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
};

export default UserInformation;
