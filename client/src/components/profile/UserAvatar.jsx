import React from 'react';

const UserAvatar = ({ name, size = 'lg' }) => {
    const parts = (name || '').trim().split(/\s+/).filter(Boolean);
    const initials =
        parts.length > 1
            ? `${parts[0][0]}${parts[1][0]}`
            : parts[0]?.slice(0, 1) || '';

    if (size === 'sm') {
        return (
            <div className="bg-gradient-to-b from-[#8DABC9] to-[#6C8AAC] w-11 h-11 rounded-full flex items-center justify-center text-white text-2xl leading-none font-medium shrink-0">
                {initials.toUpperCase()}
            </div>
        );
    }

    return (
        <div className="bg-black shadow shadow-gray-400 w-18 h-18 rounded-[50%] m-2 flex items-center justify-center text-white text-5xl font-bold">
            {initials}
        </div>
    );
};

export default UserAvatar;
