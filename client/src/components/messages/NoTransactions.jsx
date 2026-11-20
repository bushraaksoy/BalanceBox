import React from 'react';
import { BiTransfer } from 'react-icons/bi';

const NoTransactions = () => {
    const date = new Date();
    const currentMonth = date.toLocaleString('default', { month: 'long' });
    return (
        <div className="flex flex-col gap-3 items-center py-7 bg-gray-100  rounded-xl mb-8">
            <BiTransfer size={32} color="red" />
            <h1 className="text-lg font-medium">No Transactions Yet</h1>
            <div className="text-gray-500 text-center">
                <p className="">
                    You haven't logged any spendings for this {currentMonth}.
                    Start logging your spendings in the
                    <span className="font-medium text-gray-600">
                        {' '}
                        Activity{' '}
                    </span>
                    page to see them here!
                </p>
            </div>
        </div>
    );
};

export default NoTransactions;
