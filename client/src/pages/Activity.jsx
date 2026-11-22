import { useState } from 'react';
import { getExpenseCategory } from '../services/expenseService';
import { useAuthContext } from '../context/AuthContext';
import NoActivityMessage from '../components/messages/NoActivityMessage';
import { useQuery } from '@tanstack/react-query';
import { getPendingIncomes } from '../services/incomeService';
import PendingIncomes from '../components/income/PendingIncomes';
import SecondaryLayout from '../layouts/SecondaryLayout';
import ActivityExpenseItem from '../components/expense/ActivityExpenseItem';
import Amount from '../components/ui/Amount';
import Currency from '../components/Currency';
import { getBalanceOverview } from '../services/analyticsService';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const monthDate = (offset) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() + offset);
    return date;
};

const monthKey = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

const monthLabel = (date) =>
    date.toLocaleString('en-US', { month: 'long', year: 'numeric' });

const Activity = () => {
    const { userId } = useAuthContext();
    const [monthOffset, setMonthOffset] = useState(0);
    const [hidden, setHidden] = useState(false);
    const selectedMonth = monthDate(monthOffset);
    const month = monthKey(selectedMonth);
    const isCurrentMonth = monthOffset === 0;

    const { data: expenses, isLoading } = useQuery({
        queryKey: ['expenseCategory', month],
        queryFn: () => getExpenseCategory(userId, month),
    });

    const { data: overview } = useQuery({
        queryKey: ['balanceOverview', month],
        queryFn: () => getBalanceOverview(userId, month),
    });

    const { data: pendingIncomes } = useQuery({
        queryKey: ['pendingIncomes'],
        queryFn: () => getPendingIncomes(userId),
    });

    const money = (amount) =>
        hidden ? (
            '••••'
        ) : (
            <>
                <Currency />
                <Amount amount={amount || 0} />
            </>
        );

    return (
        <SecondaryLayout heading="Activity" contentClassName="bg-[#F8F9FB]">
            <div className="flex flex-col gap-4 px-4 pb-4 text-[#171717]">
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        aria-label="Previous month"
                        onClick={() => setMonthOffset((value) => value - 1)}
                        disabled={monthOffset <= -11}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#171717] disabled:opacity-30 dark:bg-[#2a2a2e]"
                    >
                        <IoChevronBack size={18} />
                    </button>
                    <p className="text-sm font-medium">{monthLabel(selectedMonth)}</p>
                    <button
                        type="button"
                        aria-label="Next month"
                        onClick={() => setMonthOffset((value) => value + 1)}
                        disabled={isCurrentMonth}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#171717] disabled:opacity-30 dark:bg-[#2a2a2e]"
                    >
                        <IoChevronForward size={18} />
                    </button>
                </div>

                <section className="balance-card rounded-2xl px-4 py-4 shadow-[0_8px_24px_rgba(23,23,23,0.08)]">
                    <div className="mb-3 h-1 w-10 rounded-full bg-[#E6B33D]" />
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="balance-muted text-xs">Current balance</p>
                            <p className="balance-amount mt-1 text-3xl font-semibold">
                                {money(overview?.currentBalance)}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setHidden((value) => !value)}
                            aria-label={hidden ? 'Show balances' : 'Hide balances'}
                            className="balance-muted"
                        >
                            {hidden ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>
                    <div className="balance-rule mt-4 grid grid-cols-2 gap-3 border-t pt-3">
                        <div>
                            <p className="balance-muted text-xs">Income</p>
                            <p className="mt-0.5 font-medium">
                                {money(overview?.totalIncome)}
                            </p>
                        </div>
                        <div>
                            <p className="balance-muted text-xs">Spent</p>
                            <p className="mt-0.5 font-medium">
                                {money(overview?.totalExpenses)}
                            </p>
                        </div>
                    </div>
                </section>

                {isLoading ? (
                    <div className="flex flex-col gap-3">
                        <div className="h-28 animate-pulse rounded-2xl bg-white" />
                        <div className="h-28 animate-pulse rounded-2xl bg-white" />
                    </div>
                ) : (
                    <>
                        {pendingIncomes?.length > 0 && (
                            <PendingIncomes pendingIncomes={pendingIncomes} />
                        )}
                        <section className="flex flex-col gap-3">
                            <h2 className="text-sm font-medium">Spending</h2>
                            {expenses?.length > 0 ? (
                                expenses.map((expense) => (
                                    <ActivityExpenseItem
                                        key={expense.id}
                                        expense={expense}
                                        canLog={isCurrentMonth}
                                    />
                                ))
                            ) : (
                                <NoActivityMessage />
                            )}
                        </section>
                    </>
                )}
            </div>
        </SecondaryLayout>
    );
};

export default Activity;
