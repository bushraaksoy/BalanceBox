import React, { useState } from 'react';
import VaulDrawer from './Drawer';
import Loader from '../Loader';
import TransactionItem from '../transaction/TransactionItem';
import { useAuthContext } from '../../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { confirmBankStatementTransactions } from '../../services/documentService';
import { toast } from 'sonner';

const BankstatementTransactionsDrawer = ({
    trigger,
    transactions,
    card,
    isLoading,
    isOpen,
    setIsOpen,
}) => {
    const { userId } = useAuthContext();
    const queryClient = useQueryClient();

    const { mutate, isConfirmLoading } = useMutation({
        mutationFn: () =>
            confirmBankStatementTransactions(userId, {
                transactions,
                card,
            }),
        onSuccess: (data) => {
            console.log('Transactions added successfully:', data);
            toast.success('Transactions Added!');
            queryClient.invalidateQueries([
                'cards',
                'balanceOverview',
                'budgetRemainder',
                'transactions',
                'transactionsSummary',
            ]);
            setIsOpen(false);
        },
        onError: (error) => {
            console.error('Error confirming transactions:', error);
            toast.error('Could not confirm transactions');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate();
    };

    return (
        <VaulDrawer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Confirm Transactions"
            trigger={trigger}
        >
            <div className="py-4">
                {isLoading || isConfirmLoading ? (
                    <div className="my-6 h-56">
                        <Loader />
                        <h1 className=" text-lg text-yellow-600 text-center">
                            Scanning Document
                        </h1>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-2 pb-8">
                        {transactions?.map((transaction) => (
                            <TransactionItem
                                key={transaction.id}
                                transaction={transaction}
                            />
                        ))}
                    </ul>
                )}
                {isConfirmLoading ? (
                    <>loading...</>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="p-2 my-2 rounded-xl bg-yellow-400 w-full "
                    >
                        Confirm
                    </button>
                )}
            </div>
        </VaulDrawer>
    );
};

export default BankstatementTransactionsDrawer;
