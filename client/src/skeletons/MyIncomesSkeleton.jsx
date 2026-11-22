import React from 'react';
import Currency from '../components/Currency';

const MyIncomesSkeleton = () => {
    return (
        <div className="pb-8">
            <div className="flex justify-between  py-3">
                <h2 className="font-medium">My Incomes</h2>
            </div>
            <div className="expense-items flex flex-col gap-1 text-gray-100">
                <div className="expense-item w-full rounded-xl py-3 flex justify-between glow">
                    <div className="flex gap-2 items-center">
                        <div className="flex flex-col justify-center">
                            <h3 className="font-medium">|</h3>
                            <span className="text-xs ">|</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <span><Currency /> </span>
                            <span className="text-xs"></span>
                        </div>
                    </div>
                </div>
                <div className="expense-item w-full rounded-xl py-3 flex justify-between glow">
                    <div className="flex gap-2 items-center">
                        <div className="flex flex-col justify-center">
                            <h3 className="font-medium">|</h3>
                            <span className="text-xs ">|</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <span><Currency /> </span>
                            <span className="text-xs"></span>
                        </div>
                    </div>
                </div>
                <div className="expense-item w-full rounded-xl py-3 flex justify-between glow">
                    <div className="flex gap-2 items-center">
                        <div className="flex flex-col justify-center">
                            <h3 className="font-medium">|</h3>
                            <span className="text-xs ">|</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <span><Currency /> </span>
                            <span className="text-xs"></span>
                        </div>
                    </div>
                </div>
                <div className="expense-item w-full rounded-xl py-3 flex justify-between glow">
                    <div className="flex gap-2 items-center">
                        <div className="flex flex-col justify-center">
                            <h3 className="font-medium">|</h3>
                            <span className="text-xs ">|</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <span><Currency /> </span>
                            <span className="text-xs"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyIncomesSkeleton;
