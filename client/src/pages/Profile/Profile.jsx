import MainLayout from '../../layouts/MainLayout';
import SignOutBtn from '../../components/buttons/SignOutBtn';
import UserProfileCard from '../../components/profile/UserProfileCard';
import { useAuthContext } from '../../context/AuthContext';
import { getUserProfile } from '../../services/profileService';
import { useQuery } from '@tanstack/react-query';
import Settings from '../../components/profile/Settings';
import SimpleLoading from '../../skeletons/SimpleLoading';
import AccountSkeleton from '../../skeletons/AccountSkeleton';

const Profile = () => {
    const { userId } = useAuthContext();
    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: () => getUserProfile(userId),
        staleTime: Infinity,
    });

    if (isLoading) {
        return <AccountSkeleton />;
    }

    return (
        <MainLayout>
            <div className="flex flex-col gap-5">
                <UserProfileCard profile={profile} />
                <Settings />
                <SignOutBtn />
            </div>
        </MainLayout>
    );
};

export default Profile;
