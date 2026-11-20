import React from 'react';
import SecondaryLayout from '../layouts/SecondaryLayout';
import SignOutBtn from '../components/buttons/SignOutBtn';
import Settings from '../components/profile/Settings';

const AccountSkeleton = () => {
    return (
        <SecondaryLayout heading="Account">
            <div className="flex flex-col gap-4 px-4 pb-4 bg-white min-h-full">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl h-16 glow"></div>
                <Settings />
                <SignOutBtn />
            </div>
        </SecondaryLayout>
    );
};

export default AccountSkeleton;
