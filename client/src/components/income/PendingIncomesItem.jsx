import React, { useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import Currency from '../Currency';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FcOk } from 'react-icons/fc';
import { addIncomeTransaction } from '../../services/transactionService';
import { toast } from 'sonner';
import { useAuthContext } from '../../context/AuthContext';

const PendingIncomesItem = ({ income }) => {
    const { userId } = useAuthContext();
    const [checked, setChecked] = useState(false);
    const queryClient = useQueryClient();
    const data = {
        incomeId: income.id,
        title: income.title,
    };
    const { mutate: addIncomeTransactionMutation, isAddTransactionLoading } =
        useMutation({
            mutationFn: () => addIncomeTransaction(userId, data),
            onSuccess: () => {
                setChecked(true);
                setTimeout(() => {
                    console.log('Income added to card!', data);
                    toast.success('Income added to balance!');
                    queryClient.invalidateQueries([
                        'cards',
                        'cardsDetails',
                        'balanceOverview',
                        'budgetRemainder',
                        'pendingIncomes',
                        'currentBalance',
                    ]);
                }, 1000);
            },
            onError: (error) => {
                console.log('Error adding income transaction.', error);
                toast.error('Failed to add income to balance');
            },
        });

    const handleAddTransaction = async (e) => {
        e.preventDefault();
        console.log('clicked');
        addIncomeTransactionMutation();
    };

    return (
        <div
            className={`p-3 transition-opacity duration-500 rounded-xl border-stone-200 border flex items-center justify-between bg-white ${
                checked && `opacity-0`
            }`}
        >
            <div>
                <h1 className="font-medium  text-yellow-600">
                    <Currency />
                    {income.amount}
                </h1>
                <div className="text-sm text-gray-700">{income.title}</div>
            </div>

            <div className="relative">
                <FcOk
                    size={28}
                    className={`absolute -bottom-3 right-1/2 transition-transform duration-500 ${
                        checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                />
                <IoIosCheckmarkCircleOutline
                    size={28}
                    onClick={handleAddTransaction}
                    className={`absolute -bottom-3 right-1/2 transition-transform duration-500 ${
                        checked ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                    }`}
                />
            </div>
        </div>
    );
};

export default PendingIncomesItem;
