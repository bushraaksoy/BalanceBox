import React from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import { useAuthContext } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getAllIncomes } from '../services/incomeService';
import MyIncomesSkeleton from '../skeletons/MyIncomesSkeleton';
import AddIncomeDrawer from '../components/drawers/AddIncomeDrawer';
import { FiPlusCircle } from 'react-icons/fi';
import IncomeDetails from '../components/drawers/IncomeDetails';
import BudgetingIncomeCard from '../components/income/BudgetingIncomeCard';
import NoIncomeMessage from '../components/messages/NoIncomeMessage';

const Incomes = () => {
    const { userId } = useAuthContext();

    const { data: incomes, isLoading } = useQuery({
        queryKey: ['incomes'],
        queryFn: () => getAllIncomes(userId),
        staleTime: Infinity,
    });

    if (isLoading) {
        return (
            <div className="app bg-gray-50">
                <MyIncomesSkeleton />
            </div>
        );
    }
    return (
        <SubpageLayout heading={'My Incomes'}>
            <div className="flex justify-between py-2">
                <h2 className="font-medium ">All Incomes</h2>
                <AddIncomeDrawer trigger={<FiPlusCircle size={25} />} />
            </div>
            <div className="income-cards flex-col w-90 flex gap-3 overflow-scroll ">
                {incomes.length > 0 ? (
                    incomes?.map((income) => (
                        <IncomeDetails
                            key={income.id}
                            income={income}
                            trigger={
                                <BudgetingIncomeCard
                                    amount={income.amount}
                                    title={income.title}
                                />
                            }
                        />
                    ))
                ) : (
                    <NoIncomeMessage />
                )}
            </div>
        </SubpageLayout>
    );
};

export default Incomes;
