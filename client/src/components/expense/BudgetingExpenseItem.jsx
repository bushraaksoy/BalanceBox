import React from 'react';
import { expenseCategoryIcons } from '../../constants/constants';
import Currency from '../Currency';
import Amount from '../ui/Amount';

const pretty = (value) => {
    if (!value) return '';
    const text = String(value).toLowerCase().replaceAll('_', ' ');
    return text.charAt(0).toUpperCase() + text.slice(1);
};

const BudgetingExpenseItem = ({ category, title, amount, frequency }) => {
    return (
        <div className="flex w-full items-center justify-between gap-3 border-b border-[#E8E9ED] py-3 text-sm last:border-0">
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#171717] [&_img]:h-4 [&_img]:w-4 [&_svg]:h-4 [&_svg]:w-4">
                    {expenseCategoryIcons[category]}
                </div>
                <div className="min-w-0">
                    <h3 className="truncate font-medium leading-5 text-[#171717]">
                        {title}
                    </h3>
                    {category && (
                        <p className="text-xs text-[#737987]">{pretty(category)}</p>
                    )}
                </div>
            </div>
            <div className="shrink-0 text-right">
                <div className="font-medium text-[#171717]">
                    <Currency />
                    <Amount amount={amount} />
                </div>
                {frequency && (
                    <p className="text-xs text-[#737987]">{pretty(frequency)}</p>
                )}
            </div>
        </div>
    );
};

export default BudgetingExpenseItem;
