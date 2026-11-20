import React, { useState } from 'react';
import { TbCategoryFilled } from 'react-icons/tb';
import { expenseCategoryIcons } from '../../constants/constants.jsx';
import ActivityExpenseItem from './ActivityExpenseItem.jsx';
import AddTransactionPopup from '../transaction/AddTransactionPopup.jsx';

const ExpenseCategory = ({ title, expenses }) => {
    // TODO: change popup into vaul drawer
    const [showPopup, setShowPopup] = useState(false);
    const [expense, setExpense] = useState('');
    const handleClick = async (expense) => {
        setShowPopup(!showPopup);
        setExpense(expense);
    };

    return (
        <div className="expense-category mb-3">
            <div className="p-4 flex items-center gap-3">
                {expenseCategoryIcons[title] || <TbCategoryFilled size={20} />}
                <h1 className="font-medium text-md">{title}</h1>
            </div>
            <AddTransactionPopup
                visible={showPopup}
                setVisible={setShowPopup}
                expense={expense}
            />
            <ul>
                {expenses.map((expense, inx) => (
                    <ActivityExpenseItem
                        key={inx}
                        title={expense.title}
                        amount={expense.amount}
                        usedAmount={expense.usedAmount}
                        onClick={() => {
                            handleClick(expense);
                        }}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ExpenseCategory;
