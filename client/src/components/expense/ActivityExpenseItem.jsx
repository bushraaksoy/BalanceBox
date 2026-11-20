import React, { useState } from 'react';
import Currency from '../Currency';
import Amount from '../ui/Amount';
import { expenseCategoryIcons } from '../../constants/constants';
import AddTransactionPopup from '../transaction/AddTransactionPopup';

const ActivityExpenseItem = ({ expense }) => {
    let usedPercentage = (expense.usedAmount / expense.amount) * 100;
    const pastLimit = usedPercentage > 100 ? true : false;

    const [showPopup, setShowPopup] = useState(false);

    const handleClick = async (expense) => {
        setShowPopup(true);
    };

    return (
        <li
            onClick={handleClick}
            className="p-4 px-5 w-full  bg-white border-b border-stone-200 flex flex-col gap-2 rounded-xl"
        >
            <AddTransactionPopup
                visible={showPopup}
                setVisible={setShowPopup}
                expense={expense}
            />
            <div className="flex justify-between">
                <span className="flex gap-2 items-center font-medium">
                    {expenseCategoryIcons[expense.category] || (
                        <TbCategoryFilled size={20} />
                    )}
                    {expense.title}
                </span>
                <div>
                    <span>
                        <Currency />
                        {expense.usedAmount}
                    </span>
                    <span className="text-xs text-stone-600">
                        / <Amount amount={expense.amount} />
                    </span>
                </div>
            </div>
            <div className="progress-bar h-2 rounded-4xl w-full relative shadow-inner border border-gray-100 bg-white">
                <span
                    style={{ width: `${pastLimit ? 100 : usedPercentage}%` }}
                    className={`progress-bar h-full rounded-4xl transition-all duration-600 ease-in-out bg-gradient-to-b absolute left-0 top-0 ${
                        pastLimit
                            ? `from-red-600 to-red-400`
                            : `from-green-600  to-green-500`
                    }`}
                ></span>
            </div>
        </li>
    );
};

export default ActivityExpenseItem;
