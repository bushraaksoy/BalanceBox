import React from 'react';
import { FcMoneyTransfer } from 'react-icons/fc';
import { FiPlusCircle } from 'react-icons/fi';

const NoExpensesMessage = () => {
    return (
        <div className="flex flex-col gap-3 items-center pt-15 pb-20">
            <FcMoneyTransfer size={32} />
            <h1 className="text-lg font-medium">No Expenses Yet</h1>
            <div className="text-gray-500 text-center">
                <p className="">You have not budgeted your expenses yet</p>
                <p className="">
                    Click on the
                    <FiPlusCircle className="inline mx-2" size={22} />
                    icon to add an expense to your budget!
                </p>
            </div>
        </div>
    );
};

export default NoExpensesMessage;
