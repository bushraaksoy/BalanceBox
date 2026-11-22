import React from 'react';
import ViewAllButton from '../buttons/ViewAllButton';
import TransactionsList from './TransactionsList';
import { useAuthContext } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getTransactionHistory } from '../../services/transactionService';
import TransactionItemsSkeleton from '../../skeletons/TransactionItemsSkeleton';

const TransactionHistory = () => {
    const { userId } = useAuthContext();

    const { data: transactions, isLoading } = useQuery({
        queryKey: ['transactions'],
        queryFn: () => getTransactionHistory(userId),
        staleTime: Infinity,
    });

    if (isLoading) {
        return <TransactionItemsSkeleton />;
    }
    const date = new Date();
    const currentMonth = date.toLocaleString('default', { month: 'long' });
    return (
        <div>
            <h1 className="font-semibold text-stone-800 p-3 my-2">
                {currentMonth} Transaction History
            </h1>
            <TransactionsList transactions={transactions} />
            {transactions?.length > 0 && <ViewAllButton to={'/transactions'} />}
        </div>
    );
};

export default TransactionHistory;
