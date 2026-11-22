import React from 'react';
import { FaArrowUpLong } from 'react-icons/fa6';
import { FaArrowDownLong } from 'react-icons/fa6';
import { useAuthContext } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getBalanceOverview } from '../../services/analyticsService';
import BalanceCardSkeleton from '../../skeletons/BalanceCardSkeleton';
import Currency from '../Currency';
import Amount from '../ui/Amount';

const BalanceCard = () => {
    const { userId } = useAuthContext();
    const { data: balanceOverview, isLoading } = useQuery({
        queryKey: ['balanceOverview'],
        queryFn: () => getBalanceOverview(userId),
        staleTime: Infinity,
    });

    if (isLoading) {
        return <BalanceCardSkeleton />;
    }

    const currentBalance = balanceOverview?.currentBalance ?? 0;
    const totalIncome = balanceOverview?.totalIncome ?? 0;
    const totalExpenses = balanceOverview?.totalExpenses ?? 0;

    return (
        <div className="w-full bg-gradient-to-br from-yellow-200 to-yellow-500 h-46 rounded-2xl flex flex-col justify-evenly text-stone-800 shadow-md">
            <div className=" text-center">
                <div className="font-bold text-xl">
                    <span>
                        <Currency />
                    </span>{' '}
                    <Amount amount={currentBalance} />
                </div>
                <h2 className="text-md">Available Balance</h2>
            </div>
            <div className="flex justify-evenly ">
                <BalanceCardInfo
                    title="Total Income"
                    amount={totalIncome}
                    icon={<FaArrowUpLong size={30} />}
                />
                <BalanceCardInfo
                    title="Total Expenses"
                    amount={totalExpenses}
                    icon={<FaArrowDownLong size={30} />}
                />
            </div>
        </div>
    );
};

const BalanceCardInfo = ({ title, amount }) => {
    return (
        <div className=" text-center">
            <div className="font-bold text-lg">
                <span>
                    <Currency />
                </span>{' '}
                <Amount amount={amount} />
            </div>
            <h2 className="text-md">{title}</h2>
        </div>
    );
};

export default BalanceCard;
