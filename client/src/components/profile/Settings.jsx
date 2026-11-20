import React from 'react';
import SettingsItem from './SettingsItem';
import { IoNotifications, IoSettings } from 'react-icons/io5';
import { MdSecurity } from 'react-icons/md';

const Settings = () => {
    return (
        <div className="settings p-2 border-b border-gray-200">
            <h1 className="text-lg font-semibold py-2">Account Setting</h1>
            <SettingsItem title="General" icon={<IoSettings size={20} />} />
            <SettingsItem
                title="Notifications"
                icon={<IoNotifications size={20} />}
            />
            <SettingsItem
                title="Your data in BalanceBox"
                icon={<MdSecurity size={20} />}
            />
        </div>
    );
};

export default Settings;
