import React from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import SubHeading from '../components/ui/SubHeading';
import { useAuthContext } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getAllTransactions } from '../services/transactionService';
import TransactionsList from '../components/transaction/TransactionsList';
import TransactionItemsSkeleton from '../skeletons/TransactionItemsSkeleton';

const Transactions = () => {
    const { userId } = useAuthContext();
    const { data: transactions, isLoading } = useQuery({
        queryKey: ['allTransactions'],
        queryFn: () => getAllTransactions(userId),
    });

    if (isLoading) {
        return (
            <SubpageLayout>
                <TransactionItemsSkeleton />;
            </SubpageLayout>
        );
    }

    return (
        <SubpageLayout heading={'Transactions'}>
            {/* <SubHeading>All Transactions</SubHeading> */}
            <div className="py-2">
                <TransactionsList transactions={transactions} />
            </div>
        </SubpageLayout>
    );
};

export default Transactions;
