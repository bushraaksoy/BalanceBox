import React from 'react';
import PendingIncomesItem from './PendingIncomesItem';
import SubHeading from '../ui/SubHeading';

const PendingIncomes = ({ pendingIncomes }) => {
    return (
        <div className="incomes border-gray-200 py-4">
            <h1 className="p-4 font-medium">
                Have you recieved these incomes?
            </h1>
            <div className="pending-incomes flex flex-col gap-1 px-4">
                {pendingIncomes?.map((income) => (
                    <PendingIncomesItem key={income.id} income={income} />
                ))}
            </div>
        </div>
    );
};

export default PendingIncomes;
