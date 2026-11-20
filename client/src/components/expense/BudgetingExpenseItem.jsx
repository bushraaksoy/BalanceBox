import React from 'react';
import { expenseCategoryIcons } from '../../constants/constants';
import Currency from '../Currency';

const BudgetingExpenseItem = ({ category, title, amount }) => {
    return (
        <div className="expense-item w-full rounded-2xl py-3 flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-gray-200 rounded-lg">
                    {expenseCategoryIcons[category]}
                </div>
                <div className="flex flex-col justify-center items-start">
                    <h3 className="font-medium">{title}</h3>
                    <span className="text-xs text-gray-500">{category}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div>
                    <span>
                        <Currency />
                    </span>
                    {amount}
                    <span className="text-gray-500 text-xs">/month</span>
                </div>
            </div>
        </div>
    );
};

export default BudgetingExpenseItem;
