import React from 'react';

const BudgetRemainderSkeleton = () => {
    return (
        <div className="budget-leftover flex justify-between glow py-3 rounded-2xl text-gray-100">
            <h1 className="font-medium"></h1>
            <p className="text-center font-semibold text-lg px-3">₸</p>
        </div>
    );
};

export default BudgetRemainderSkeleton;
