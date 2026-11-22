import { Link } from 'react-router';
import { IoChevronForward } from 'react-icons/io5';

const SettingsItem = ({ title, icon, to }) => {
    const className = 'flex gap-3 py-3 items-center';
    const content = (
        <>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-black">
                {icon}
            </div>
            <div className="flex-1 text-sm">{title}</div>
            <IoChevronForward className="text-gray-400 shrink-0" size={16} />
        </>
    );

    if (to) {
        return (
            <Link to={to} className={className}>
                {content}
            </Link>
        );
    }

    return <div className={className}>{content}</div>;
};

export default SettingsItem;
