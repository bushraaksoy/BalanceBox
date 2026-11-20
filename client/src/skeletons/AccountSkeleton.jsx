import React from 'react';
import MainLayout from '../layouts/MainLayout';
import SignOutBtn from '../components/buttons/SignOutBtn';
import Settings from '../components/profile/Settings';

const AccountSkeleton = () => {
    return (
        <MainLayout>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 items-center bg-white border border-gray-200 rounded-xl h-96 glow py-2 mb-10 relative">
                    <div className="w-full px-5 pb-6 flex flex-col gap-10"></div>
                </div>
            </div>
            <Settings />
            <SignOutBtn />
        </MainLayout>
    );
};

export default AccountSkeleton;
