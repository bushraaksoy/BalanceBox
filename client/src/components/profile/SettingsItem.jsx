import React from 'react';

const SettingsItem = ({ title, icon }) => {
    return (
        <div className="flex gap-3 py-4 items-center ">
            {icon}
            <div>{title}</div>
        </div>
    );
};

export default SettingsItem;
