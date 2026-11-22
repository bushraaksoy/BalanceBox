import React from 'react';
import Currency from '../Currency';
import { formatAmount } from '../../utils/formatAmount';

const TransactionItem = ({ transaction }) => {
    return (
        <li className="p-4 bg-gray-100 rounded-xl flex justify-between">
            <div className="flex flex-col">
                <span className="font-medium">
                    {transaction.title ||
                        (transaction.type == 'EXPENSE'
                            ? transaction.expense?.title
                            : transaction.type == 'INCOME'
                            ? transaction.income?.title
                            : transaction.saving?.title) ||
                        'Transaction'}
                </span>
                <span className="text-xs text-gray-500">
                    {transaction.createdAt}
                </span>
            </div>
            <div className="text-end">
                <div
                    className={
                        transaction.type == 'INCOME'
                            ? 'text-green-500'
                            : transaction.type == 'EXPENSE'
                            ? 'text-red-500'
                            : 'text-blue-400'
                    }
                >
                    {transaction.type == 'INCOME' ? '+ ' : '- '}
                    <Currency /> {formatAmount(transaction.amount)}
                </div>
                <div className="text-xs text-gray-500 ">
                    {transaction.card?.title}
                </div>
            </div>
        </li>
    );
};

export default TransactionItem;
