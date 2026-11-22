import { Link } from 'react-router';
import SecondaryLayout from '../layouts/SecondaryLayout';
import SignOutBtn from '../components/buttons/SignOutBtn';
import UserProfileCard from '../components/profile/UserProfileCard';
import { useAuthContext } from '../context/AuthContext';
import { getUserProfile } from '../services/profileService';
import { useQuery } from '@tanstack/react-query';
import Settings from '../components/profile/Settings';
import AccountSkeleton from '../skeletons/AccountSkeleton';

const Profile = () => {
    const { userId, isAdmin } = useAuthContext();
    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: () => getUserProfile(userId),
        staleTime: Infinity,
    });

    if (isLoading) {
        return <AccountSkeleton />;
    }

    return (
        <SecondaryLayout heading="Account" contentClassName="bg-[#F8F9FB]">
            <div className="flex flex-col gap-4 px-4 pb-4 min-h-full">
                <UserProfileCard profile={profile} />
                <Settings />
                {isAdmin === 'true' && (
                    <Link
                        to="/admin"
                        className="w-full bg-white rounded-2xl border border-gray-200 py-3.5 text-center font-medium"
                    >
                        Admin
                    </Link>
                )}
                <SignOutBtn />
            </div>
        </SecondaryLayout>
    );
};

export default Profile;
