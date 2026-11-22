import React from 'react';
import AddGoalDrawer from '../drawers/AddGoalDrawer';
import NoGoalsMessage from '../messages/NoGoalsMessage';
import { FiPlusCircle } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../../context/AuthContext';
import { getAllSavings } from '../../services/savingService';
import Currency from '../Currency';
import Amount from '../ui/Amount';

const GoalRow = ({ goal }) => {
    const target = goal.targetAmount || 0;
    const saved = goal.savedAmount || 0;
    const remaining = Math.max(target - saved, 0);
    const percent = target > 0 ? Math.min(100, Math.round((saved / target) * 100)) : 0;

    return (
        <div className="border-b border-[#E8E9ED] py-3 last:border-0">
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-medium text-[#171717]">{goal.title}</h3>
                <p className="text-sm font-medium text-[#171717]">{percent}%</p>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F5D36B]">
                <div
                    className="h-full rounded-full bg-[#E6B33D]"
                    style={{ width: `${percent}%` }}
                />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-[#737987]">
                <p>
                    Target{' '}
                    <span className="block font-medium text-[#171717]">
                        <Currency />
                        <Amount amount={target} />
                    </span>
                </p>
                <p>
                    Saved{' '}
                    <span className="block font-medium text-[#171717]">
                        <Currency />
                        <Amount amount={saved} />
                    </span>
                </p>
                <p>
                    Left{' '}
                    <span className="block font-medium text-[#171717]">
                        <Currency />
                        <Amount amount={remaining} />
                    </span>
                </p>
            </div>
        </div>
    );
};

const MySavings = ({ className = '' }) => {
    const { userId } = useAuthContext();
    const { data: goals = [], isLoading } = useQuery({
        queryKey: ['savings'],
        queryFn: () => getAllSavings(userId),
        staleTime: Infinity,
    });

    return (
        <div className={className}>
            <div className="flex items-center justify-between">
                <h2 className="py-1 text-sm font-medium">My Goals</h2>
                <AddGoalDrawer trigger={<FiPlusCircle size={22} />} />
            </div>
            <div className="mt-1">
                {isLoading ? null : goals.length > 0 ? (
                    goals.map((goal) => <GoalRow key={goal.id} goal={goal} />)
                ) : (
                    <NoGoalsMessage />
                )}
            </div>
        </div>
    );
};

export default MySavings;
