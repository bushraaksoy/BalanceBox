import React from 'react';

const MyCardsSkeleton = () => {
    return (
        <div className="pb-8">
            <div className="flex justify-between py-3">
                <h2 className="font-medium ">My Cards</h2>
            </div>
            <div className="income-cards w-90 flex gap-3 overflow-scroll items-center ">
                <div className="w-36 h-28 glow flex-shrink-0 rounded-2xl"></div>
                <div className="w-36 h-28 glow flex-shrink-0 rounded-2xl"></div>
            </div>
        </div>
    );
};

export default MyCardsSkeleton;
