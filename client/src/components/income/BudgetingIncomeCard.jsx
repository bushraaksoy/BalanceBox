import React from 'react';
import { LuArrowDownLeft } from 'react-icons/lu';
import Currency from '../Currency';
import Amount from '../ui/Amount';

const pretty = (value) => {
    if (!value) return '';
    const text = String(value).toLowerCase().replaceAll('_', ' ');
    return text.charAt(0).toUpperCase() + text.slice(1);
};

const BudgetingIncomeCard = ({ amount, title, category, frequency }) => {
    return (
        <div className="flex w-full items-center justify-between gap-3 border-b border-[#E8E9ED] py-3 text-sm last:border-0">
            <div className="flex min-w-0 items-center gap-3">
                <div className="income-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <LuArrowDownLeft size={16} />
                </div>
                <div className="min-w-0 text-left">
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

export default BudgetingIncomeCard;
