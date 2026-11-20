import React, { useState } from 'react';
import AddGoalDrawer from '../drawers/AddGoalDrawer';
import NoGoalsMessage from '../messages/NoGoalsMessage';
import { FiPlusCircle } from 'react-icons/fi';

const MySavings = () => {
    const [goals, setGoals] = useState([]);

    return (
        <div className="savings">
            <div className="flex justify-between  py-3">
                <h2 className="font-medium py-3">My Goals</h2>
                <AddGoalDrawer trigger={<FiPlusCircle size={25} />} />
            </div>
            <div className="income-cards w-90 flex gap-3 overflow-scroll items-center ">
                {goals.length > 0 ? <></> : <NoGoalsMessage />}
            </div>
        </div>
    );
};

export default MySavings;
