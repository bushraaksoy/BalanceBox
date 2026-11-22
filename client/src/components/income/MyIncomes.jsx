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

const MyIncomes = ({ className = '' }) => {
    const { userId } = useAuthContext();

    const { data: incomes, isLoading, isError } = useQuery({
        queryKey: ['incomes'],
        queryFn: () => getAllIncomes(userId),
        staleTime: Infinity,
    });

    if (isLoading) {
        return <MyIncomesSkeleton />;
    }

    const list = Array.isArray(incomes) ? incomes : [];

    return (
        <div className={className}>
            <div className="flex justify-between items-center">
                <SubHeading className="!py-1 !text-sm">My Incomes</SubHeading>
                <AddIncomeDrawer trigger={<FiPlusCircle size={22} />} />
            </div>
            <div className="income-cards mt-1 flex flex-col">
                {isError ? (
                    <p className="py-3 text-sm text-[#737987]">
                        Couldn't load your incomes.
                    </p>
                ) : list.length > 0 ? (
                    list.map((income) => (
                            <IncomeDetails
                                key={income.id}
                                income={income}
                                trigger={
                                    <BudgetingIncomeCard
                                        amount={income.amount}
                                        title={income.title}
                                        category={income.category}
                                        frequency={income.frequency}
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
