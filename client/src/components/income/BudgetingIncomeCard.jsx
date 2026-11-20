import React from 'react';
import { LuArrowDownLeft } from 'react-icons/lu';
import Currency from '../Currency';
import Amount from '../ui/Amount';

const BudgetingIncomeCard = ({ amount, title, card }) => {
    return (
        <div className="expense-item w-full rounded-xl py-1.5 flex justify-between items-center text-sm">
            <div className="flex gap-2 items-center">
                <div className="p-1.5 bg-gray-200 rounded-md">
                    <LuArrowDownLeft size={16} />
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="font-medium leading-5">{title}</h3>
                    <span className="text-xs text-gray-500">{card}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div>
                    <span>
                        <Currency />
                    </span>
                    <Amount amount={amount} />
                    <span className="text-gray-500 text-xs">/month</span>
                </div>
            </div>
        </div>
    );
};

export default BudgetingIncomeCard;
