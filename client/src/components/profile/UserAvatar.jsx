import React from 'react';

const UserAvatar = ({ name }) => {
    const initial = name && name.charAt(0);
    return (
        <div className="bg-black shadow shadow-gray-400 w-18 h-18 rounded-[50%] m-2 flex items-center justify-center text-white text-5xl font-bold">
            {initial}
        </div>
    );
};

export default UserAvatar;
