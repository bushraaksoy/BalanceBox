import React from 'react';
import { getExpenseCategory } from '../services/expenseService';
import { useAuthContext } from '../context/AuthContext';
import NoActivityMessage from '../components/messages/NoActivityMessage';
import { useQuery } from '@tanstack/react-query';
import ActivitySkeleton from '../skeletons/ActivitySkeleton';
import { getPendingIncomes } from '../services/incomeService';
import PendingIncomes from '../components/income/PendingIncomes';
import SecondaryLayout from '../layouts/SecondaryLayout';
import SubHeading from '../components/ui/SubHeading';
import ActivityExpenseItem from '../components/expense/ActivityExpenseItem';
import Amount from '../components/ui/Amount';
import Currency from '../components/Currency';
import { getCurrentBalance } from '../services/analyticsService';

const Activity = () => {
    const { userId } = useAuthContext();

    const { data: expenses, isLoading } = useQuery({
        queryKey: ['expenseCategory'],
        queryFn: () => getExpenseCategory(userId),
        staleTime: Infinity,
    });

    const { data: currentBalance } = useQuery({
        queryKey: ['currentBalance'],
        queryFn: () => getCurrentBalance(userId),
    });

    const { data: pendingIncomes, isIncomesLoading } = useQuery({
        queryKey: ['pendingIncomes'],
        queryFn: () => getPendingIncomes(userId),
    });

    if (isLoading) {
        return (
            <div className="app bg-gray-50">
                <ActivitySkeleton />
            </div>
        );
    }

    return (
        <SecondaryLayout heading="Activity">
            <div className="h-22 pl-7">
                <div className="text-sm text-stone-500 font-medium ">
                    Current Balance
                </div>
                <h1 className="text-3xl font-semibold text-stone-700 ">
                    <Amount amount={currentBalance?.currentBalance} />
                    <Currency />
                </h1>
            </div>
            <div className="main bg-stone-100 h-full rounded-t-4xl border border-stone-200">
                {pendingIncomes?.length > 0 && (
                    <PendingIncomes pendingIncomes={pendingIncomes} />
                )}
                <div className="spendings  py-4 ">
                    <h1 className="px-4">
                        <SubHeading>My Spendings</SubHeading>
                    </h1>
                    <div className="expense-categories flex flex-col px-4 gap-1">
                        {expenses.length > 0 ? (
                            expenses.map((expense, inx) => (
                                <ActivityExpenseItem
                                    key={inx}
                                    expense={expense}
                                />
                            ))
                        ) : (
                            <NoActivityMessage />
                        )}
                    </div>
                </div>
            </div>
        </SecondaryLayout>
    );
};

export default Activity;
