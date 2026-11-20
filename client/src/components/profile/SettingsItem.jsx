import { IoChevronForward } from 'react-icons/io5';

const SettingsItem = ({ title, icon }) => {
    return (
        <div className="flex gap-3 py-3 items-center">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-black">
                {icon}
            </div>
            <div className="flex-1 text-sm">{title}</div>
            <IoChevronForward className="text-gray-400 shrink-0" size={16} />
        </div>
    );
};

export default SettingsItem;
