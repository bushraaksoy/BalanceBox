import React, { useState } from 'react';
import AddGoalDrawer from '../drawers/AddGoalDrawer';
import NoGoalsMessage from '../messages/NoGoalsMessage';
import { FiPlusCircle } from 'react-icons/fi';

const MySavings = () => {
    const [goals, setGoals] = useState([]);

    return (
        <div className="savings border border-gray-200 rounded-2xl p-3">
            <div className="flex justify-between items-center">
                <h2 className="font-medium text-sm py-2">My Goals</h2>
                <AddGoalDrawer trigger={<FiPlusCircle size={22} />} />
            </div>
            <div className="income-cards flex gap-3 overflow-scroll items-center ">
                {goals.length > 0 ? <></> : <NoGoalsMessage />}
            </div>
        </div>
    );
};

export default MySavings;
