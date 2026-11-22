import { useState } from 'react';
import Currency from '../Currency';
import Amount from '../ui/Amount';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addIncomeTransaction } from '../../services/transactionService';
import { toast } from 'sonner';
import { useAuthContext } from '../../context/AuthContext';
import IncomeDetails from '../drawers/IncomeDetails';

const laterKey = (id) => `balancebox-income-later-${id}`;

export const isIncomeLater = (id) => {
    try {
        return sessionStorage.getItem(laterKey(id)) === '1';
    } catch {
        return false;
    }
};

const payLabel = {
    DAILY: 'Daily pay',
    WEEKLY: 'Weekly pay',
    MONTHLY: 'Monthly pay',
    YEARLY: 'Yearly pay',
    OTHER: 'Other',
};

const expectedDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const PendingIncomesItem = ({ income, onLater }) => {
    const { userId } = useAuthContext();
    const [checked, setChecked] = useState(false);
    const queryClient = useQueryClient();
    const detail = [payLabel[income.frequency], expectedDate(income.date)]
        .filter(Boolean)
        .join(' • ');

    const { mutate: confirmIncome, isPending } = useMutation({
        mutationFn: () =>
            addIncomeTransaction(userId, {
                incomeId: income.id,
                title: income.title,
            }),
        onSuccess: () => {
            setChecked(true);
            toast.success('Income added to balance');
            queryClient.invalidateQueries({ queryKey: ['cards'] });
            queryClient.invalidateQueries({ queryKey: ['balanceOverview'] });
            queryClient.invalidateQueries({ queryKey: ['budgetRemainder'] });
            queryClient.invalidateQueries({ queryKey: ['pendingIncomes'] });
            queryClient.invalidateQueries({ queryKey: ['currentBalance'] });
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
        onError: () => {
            toast.error('Could not add this income');
        },
    });

    const markLater = () => {
        try {
            sessionStorage.setItem(laterKey(income.id), '1');
        } catch {
            // The card still hides for this visit.
        }
        onLater(income.id);
    };

    return (
        <div
            className={`rounded-2xl border border-dashed border-[#E6B33D] bg-[#FFFBEB] p-4 text-[#171717] transition-opacity duration-500 dark:border-[#E6B33D] dark:bg-[#2c2618] ${
                checked ? 'opacity-0' : ''
            }`}
        >
            <p className="text-lg font-semibold">
                <Currency />
                <Amount amount={income.amount} />
            </p>
            <p className="mt-0.5 text-sm">
                {income.title}
                {detail && <span className="text-[#737987]"> • {detail}</span>}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <button
                    type="button"
                    onClick={() => confirmIncome()}
                    disabled={isPending}
                    className="rounded-full bg-[#E6B33D] px-4 py-1.5 text-sm font-medium text-[#171717] disabled:opacity-60"
                >
                    {isPending ? 'Confirming…' : 'Confirm'}
                </button>
                <IncomeDetails
                    income={income}
                    triggerClassName="bg-transparent p-0 text-sm font-medium text-[#737987]"
                    trigger="Edit"
                />
                <button
                    type="button"
                    onClick={markLater}
                    className="text-sm font-medium text-[#737987]"
                >
                    Not yet
                </button>
            </div>
        </div>
    );
};

export default PendingIncomesItem;
