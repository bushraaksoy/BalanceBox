import React from 'react';
import MyExpenses from '../components/expense/MyExpenses';
import MyIncomes from '../components/income/MyIncomes';
import MySavings from '../components/savings/MySavings';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getBudgetRemainder } from '../services/analyticsService';
import MyCards from '../components/card/MyCards';
import Currency from '../components/Currency';
import BudgetRemainderSkeleton from '../skeletons/BudgetRemainderSkeleton';
import SecondaryLayout from '../layouts/SecondaryLayout';
import Amount from '../components/ui/Amount';

const sectionClass =
    'rounded-2xl border border-[#E8E9ED] bg-white p-4 shadow-[0_8px_24px_rgba(23,23,23,0.04)]';

const BudgetPlanner = () => {
    return (
        <SecondaryLayout
            heading="Budget Planner"
            contentClassName="bg-[#F8F9FB]"
        >
            <div className="flex flex-col gap-4 px-5 pb-4 text-[#171717]">
                <BudgetRemainder />
                <MyCards className={sectionClass} />
                <MyIncomes className={sectionClass} />
                <MyExpenses className={sectionClass} />
                <MySavings className={sectionClass} />
            </div>
        </SecondaryLayout>
    );
};

export default BudgetPlanner;

const MoneyLine = ({ label, amount }) => (
    <div>
        <p className="text-xs text-[#737987]">{label}</p>
        <p className="mt-0.5 text-sm font-medium">
            <Currency />
            <Amount amount={amount} />
        </p>
    </div>
);

const BudgetRemainder = () => {
    const { userId } = useAuthContext();

    const { data, isLoading } = useQuery({
        queryKey: ['budgetRemainder'],
        queryFn: () => getBudgetRemainder(userId),
        staleTime: Infinity,
    });

    if (isLoading) {
        return <BudgetRemainderSkeleton />;
    }

    const income = data?.totalIncome || 0;
    const allocated = data?.totalAllocated || 0;
    const left = data?.budgetRemainder ?? income - allocated;
    const percent = income > 0 ? Math.round((allocated / income) * 100) : 0;
    const bar = Math.min(Math.max(percent, 0), 100);
    const fullyAllocated = income > 0 && left === 0;
    const overBudget = left < 0;

    return (
        <div className={sectionClass}>
            <p className="text-sm text-[#737987]">Amount left to budget</p>
            <div className="mt-1 text-3xl font-semibold tracking-tight">
                <Currency />
                <Amount amount={left} />
            </div>
            <p className="mt-1 text-sm text-[#737987]">
                {overBudget && 'Over budget'}
                {fullyAllocated && 'Fully allocated'}
                {!overBudget && !fullyAllocated && `${percent}% of income allocated`}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#F5D36B]">
                <div
                    className="h-full rounded-full bg-[#E6B33D]"
                    style={{ width: `${bar}%` }}
                />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
                <MoneyLine label="Income" amount={income} />
                <MoneyLine label="Allocated" amount={allocated} />
            </div>
        </div>
    );
};
