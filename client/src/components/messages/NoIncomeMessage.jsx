import React from 'react';
import { FcMoneyTransfer } from 'react-icons/fc';
import { FiPlusCircle } from 'react-icons/fi';

const NoIncomeMessage = () => {
    return (
        <div className="flex flex-col gap-3 items-center pt-15 pb-20">
            <FcMoneyTransfer size={32} />
            <h1 className="text-lg font-medium">No Incomes Yet</h1>
            <div className="text-gray-500 text-center">
                <p className="">You have not added your incomes yet</p>
                <p className="">
                    Click on the
                    <FiPlusCircle className="inline mx-2" size={22} />
                    icon to add your incomes and start budgeting!
                </p>
            </div>
        </div>
    );
};

export default NoIncomeMessage;
