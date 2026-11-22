import React from 'react';
import SettingsItem from './SettingsItem';
import { IoNotifications, IoSettings } from 'react-icons/io5';
import { MdDarkMode, MdSecurity } from 'react-icons/md';
import { HiCurrencyDollar } from 'react-icons/hi2';

const Settings = () => {
    return (
        <div className="settings bg-white rounded-2xl px-3 border border-gray-200 divide-y divide-gray-200">
            <SettingsItem
                title="Appearance"
                to="/settings/appearance"
                icon={<MdDarkMode size={16} />}
            />
            <SettingsItem
                title="Currency"
                to="/settings/currency"
                icon={<HiCurrencyDollar size={16} />}
            />
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
