import React from 'react';
import MainLayout from '../layouts/MainLayout';
import TransactionItemsSkeleton from './TransactionItemsSkeleton';
import MyCardsSkeleton from './MyCardsSkeleton';
import MyIncomesSkeleton from './MyIncomesSkeleton';
import BudgetRemainderSkeleton from './BudgetRemainderSkeleton';

const BudgetingSkeleton = () => {
    return (
        <MainLayout>
            <div className="flex flex-col gap-4">
                <BudgetRemainderSkeleton />
                <MyCardsSkeleton />
                <MyIncomesSkeleton />
            </div>
        </MainLayout>
    );
};

export default BudgetingSkeleton;
