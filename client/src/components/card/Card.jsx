import React from 'react';
import { LuLandmark } from 'react-icons/lu';
import Currency from '../Currency';
import Amount from '../ui/Amount';

const Card = ({ title, balance, hidden }) => {
    return (
        <div className="flex h-28 w-44 flex-shrink-0 flex-col justify-between rounded-2xl bg-gradient-to-br from-[#F5D36B] to-[#E6B33D] px-4 py-4 text-[#171717] shadow-sm">
            <div className="flex items-center justify-between gap-2">
                <h1 className="truncate text-left text-sm font-medium">{title}</h1>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/50">
                    <LuLandmark size={14} />
                </span>
            </div>
            <div className="text-left">
                <p className="text-xs text-[#171717]/70">Balance</p>
                <div className="text-lg font-semibold">
                    {hidden ? (
                        '••••'
                    ) : (
                        <>
                            <Currency />
                            <Amount amount={balance} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
