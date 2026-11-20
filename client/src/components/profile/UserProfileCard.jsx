import { Link } from 'react-router';
import { IoChevronForward } from 'react-icons/io5';
import UserAvatar from './UserAvatar';

const UserProfileCard = ({ profile }) => {
    const name = profile?.fullname || profile?.username;
    const username = profile?.username;

    return (
        <Link
            to="/edit-profile"
            className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200"
        >
            <UserAvatar name={name} size="sm" />
            <div className="flex flex-col min-w-0 flex-1">
                <span className="font-medium truncate">{name}</span>
                {profile?.fullname && username && (
                    <span className="text-sm text-gray-500 truncate">
                        {username}
                    </span>
                )}
            </div>
            <IoChevronForward className="text-gray-400 shrink-0" size={18} />
        </Link>
    );
};

export default UserProfileCard;
