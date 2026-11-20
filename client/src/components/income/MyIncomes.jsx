import React from 'react';
import AddIncomeDrawer from '../drawers/AddIncomeDrawer';
import AddIncome from './AddIncome';
import BudgetingIncomeCard from './BudgetingIncomeCard';
import { useAuthContext } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getAllIncomes } from '../../services/incomeService';
import { FiPlusCircle } from 'react-icons/fi';
import NoIncomeMessage from '../../components/messages/NoIncomeMessage';
import IncomeDetails from '../drawers/IncomeDetails';
import MyIncomesSkeleton from '../../skeletons/MyIncomesSkeleton';
import { FcRight } from 'react-icons/fc';
import { FaAngleRight, FaArrowRightLong } from 'react-icons/fa6';
import ViewAllButton from '../buttons/ViewAllButton';
import SubHeading from '../ui/SubHeading';

const MyIncomes = () => {
    const { userId } = useAuthContext();

    const { data: incomes, isLoading } = useQuery({
        queryKey: ['incomes'],
        queryFn: () => getAllIncomes(userId),
        staleTime: Infinity,
    });

    if (isLoading) {
        return <MyIncomesSkeleton />;
    }

    return (
        <div className="incomes  border-gray-200 pb-8">
            <div className="flex justify-between py-2">
                <SubHeading>My Incomes</SubHeading>
                <AddIncomeDrawer trigger={<FiPlusCircle size={25} />} />
            </div>
            <div className="income-cards flex-col w-90 flex gap-3 overflow-scroll ">
                {incomes.length > 0 ? (
                    incomes
                        .slice()
                        ?.map((income) => (
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
                {/* {incomes?.length > 0 && <ViewAllButton to={'/incomes'} />} */}
            </div>
        </div>
    );
};

export default MyIncomes;
