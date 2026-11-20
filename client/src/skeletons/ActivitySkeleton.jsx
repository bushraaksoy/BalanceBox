import React from 'react';
import MainLayout from '../layouts/MainLayout';
import TransactionItemsSkeleton from './TransactionItemsSkeleton';

const ActivitySkeleton = () => {
    return (
        <MainLayout>
            <h1 className="text-lg font-semibold  px-2">My Spendings</h1>
            <TransactionItemsSkeleton />
        </MainLayout>
    );
};

export default ActivitySkeleton;
