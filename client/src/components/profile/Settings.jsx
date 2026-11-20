import React from 'react';
import SettingsItem from './SettingsItem';
import { IoNotifications, IoSettings } from 'react-icons/io5';
import { MdSecurity } from 'react-icons/md';

const Settings = () => {
    return (
        <div className="settings bg-gray-50 rounded-2xl px-3 border border-gray-200 divide-y divide-gray-200">
            <SettingsItem title="General" icon={<IoSettings size={16} />} />
            <SettingsItem
                title="Notifications"
                icon={<IoNotifications size={16} />}
            />
            <SettingsItem
                title="Your data in BalanceBox"
                icon={<MdSecurity size={16} />}
            />
        </div>
    );
};

export default Settings;
