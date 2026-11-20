import React from 'react';
import MyExpenses from '../../components/expense/MyExpenses';
import MyIncomes from '../../components/income/MyIncomes';
import MySavings from '../../components/savings/MySavings';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../../context/AuthContext';
import { getBudgetRemainder } from '../../services/analyticsService';
import MyCards from '../../components/card/MyCards';
import Currency from '../../components/Currency';
import BudgetRemainderSkeleton from '../../skeletons/BudgetRemainderSkeleton';
import SecondaryLayout from '../../layouts/SecondaryLayout';
import Amount from '../../components/ui/Amount';

const BudgetPlanner = () => {
    // TODO: fetch actual data for savings
    return (
        <SecondaryLayout heading="Budget Planner">
            <div className="flex flex-col gap-4 px-5">
                <BudgetRemainder />
                <MyCards />
                <MyIncomes />
                <MyExpenses />
                <MySavings />
            </div>
        </SecondaryLayout>
    );
};

export default BudgetPlanner;

const BudgetRemainder = () => {
    const { userId } = useAuthContext();

    const { data: budgetRemainder, isLoading } = useQuery({
        queryKey: ['budgetRemainder'],
        queryFn: () => getBudgetRemainder(userId),
        staleTime: Infinity,
    });

    if (isLoading) {
        return <BudgetRemainderSkeleton />;
    }
    return (
        <div className="budget-leftover flex justify-between    border-gray-300 py-3">
            <h1 className="font-medium">Amount left to budget:</h1>
            <div className="text-center font-semibold text-lg">
                <Currency /> <Amount amount={budgetRemainder.budgetRemainder} />
            </div>
        </div>
    );
};
