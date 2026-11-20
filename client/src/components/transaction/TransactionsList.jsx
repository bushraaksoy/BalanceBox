import React from 'react';
import NoTransactions from '../messages/NoTransactions';
import TransactionItem from './TransactionItem';

const TransactionsList = ({ transactions }) => {
    return (
        <ul className="flex flex-col gap-2 pb-8">
            {transactions?.length > 0 ? (
                transactions?.map((transaction) => (
                    <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                    />
                ))
            ) : (
                <NoTransactions />
            )}
        </ul>
    );
};

export default TransactionsList;
