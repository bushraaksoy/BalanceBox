import React from 'react';
import MainLayout from '../layouts/MainLayout';
import TransactionItemsSkeleton from './TransactionItemsSkeleton';
import BalanceCardSkeleton from './BalanceCardSkeleton';

const HomeSkeleton = () => {
    return (
        <MainLayout>
            <BalanceCardSkeleton />
            <TransactionItemsSkeleton />
        </MainLayout>
    );
};

export default HomeSkeleton;
