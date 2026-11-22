import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuthContext } from '../../context/AuthContext';
import { usePreferences } from '../../context/PreferencesContext';
import {
    addExpenseTransaction,
    deleteTransaction,
} from '../../services/transactionService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getCards } from '../../services/cardService';
import ButtonLoader from '../ButtonLoader';
import { IoChevronDown, IoClose } from 'react-icons/io5';
import { formatAmount, formatTypedAmount } from '../../utils/formatAmount';

const fieldClass =
    'w-full rounded-xl border border-[#E8E9ED] bg-[#F8F9FB] px-3 py-2.5 text-sm text-[#171717] outline-none';

const refreshActivity = (queryClient) => {
    queryClient.invalidateQueries({ queryKey: ['expenseCategory'] });
    queryClient.invalidateQueries({ queryKey: ['balanceOverview'] });
    queryClient.invalidateQueries({ queryKey: ['currentBalance'] });
    queryClient.invalidateQueries({ queryKey: ['cards'] });
    queryClient.invalidateQueries({ queryKey: ['transactions'] });
};

const AddTransactionPopup = ({ visible, setVisible, expense }) => {
    const { userId } = useAuthContext();
    const { symbol } = usePreferences();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const queryClient = useQueryClient();

    const { data: cards, isLoading: cardsLoading } = useQuery({
        queryFn: () => getCards(userId),
        queryKey: ['cards'],
        enabled: visible,
    });

    const { mutate: addTransactionMutation, isPending } = useMutation({
        mutationFn: (payload) => addExpenseTransaction(userId, payload),
        onSuccess: (data) => {
            const transactionId = data?.expenseTransaction?.id;
            toast.success('Expense logged', {
                action: transactionId
                    ? {
                          label: 'Undo',
                          onClick: () => undo(transactionId),
                      }
                    : undefined,
            });
            setFormData({});
            setError('');
            setVisible(false);
            refreshActivity(queryClient);
        },
        onError: (requestError) => {
            setError(requestError.message || 'Could not log this expense');
        },
    });

    const undo = async (transactionId) => {
        try {
            await deleteTransaction(userId, transactionId);
            toast.success('Expense removed');
            refreshActivity(queryClient);
        } catch (requestError) {
            toast.error(requestError.message || 'Could not undo that expense');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const nextValue = name === 'amount' ? formatTypedAmount(value) : value;
        setFormData({ ...formData, [name]: nextValue });
        setError('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const amount = Number(String(formData.amount || '').replace(/,/g, ''));
        const card = cards?.find((item) => String(item.id) === String(formData.cardId));

        if (!formData.cardId) {
            setError('Select the card you paid with.');
            return;
        }
        if (!Number.isFinite(amount) || amount <= 0) {
            setError('Enter an amount greater than zero.');
            return;
        }
        if (card && amount > card.balance) {
            setError(`${card.title} does not have enough balance.`);
            return;
        }

        addTransactionMutation({
            ...formData,
            amount,
            expenseId: expense.id,
        });
    };

    if (!visible) return null;

    const frame = document.querySelector('.app');
    const sheet = (
        <div
            className="fixed inset-0 z-50 flex items-end bg-black/40"
            onClick={() => setVisible(false)}
        >
            <form
                onSubmit={handleSubmit}
                onClick={(event) => event.stopPropagation()}
                className="w-full rounded-t-3xl bg-white px-5 pt-3 pb-8 text-[#171717]"
            >
                <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E8E9ED]" />
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                        <p className="text-xs text-[#737987]">Log expense</p>
                        <h2 className="text-lg font-semibold">{expense?.title}</h2>
                    </div>
                    <button
                        type="button"
                        onClick={() => setVisible(false)}
                        aria-label="Close"
                        className="text-[#737987]"
                    >
                        <IoClose size={22} />
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="block">
                        <span className="text-xs text-[#737987]">Amount</span>
                        <div className={`${fieldClass} mt-1 flex items-center gap-2`}>
                            <span className="shrink-0 text-[#737987]">{symbol}</span>
                            <input
                                className="min-w-0 flex-1 bg-transparent outline-none"
                                inputMode="decimal"
                                name="amount"
                                value={formData.amount || ''}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>
                    </label>

                    <label className="block">
                        <span className="text-xs text-[#737987]">Card</span>
                        <div className="relative mt-1">
                            <select
                                name="cardId"
                                value={formData.cardId || ''}
                                onChange={handleChange}
                                className={`${fieldClass} appearance-none pr-8`}
                            >
                                <option value="">Select a card</option>
                                {cards?.map((card) => (
                                    <option key={card.id} value={card.id}>
                                        {card.title} · {formatAmount(card.balance)} {symbol}
                                    </option>
                                ))}
                            </select>
                            <IoChevronDown
                                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#737987]"
                                size={16}
                            />
                        </div>
                    </label>

                    <label className="block">
                        <span className="text-xs text-[#737987]">Note</span>
                        <input
                            className={`${fieldClass} mt-1`}
                            type="text"
                            name="title"
                            value={formData.title || ''}
                            onChange={handleChange}
                            placeholder="Optional"
                        />
                    </label>

                    {error && <p className="text-sm text-[#b42323]">{error}</p>}

                    <button
                        disabled={isPending || cardsLoading || !cards?.length}
                        type="submit"
                        className="mt-1 flex w-full items-center justify-center rounded-full bg-[#E6B33D] py-3 font-medium text-[#171717] disabled:opacity-60"
                    >
                        {isPending ? <ButtonLoader /> : 'Log expense'}
                    </button>
                    {!cardsLoading && !cards?.length && (
                        <p className="text-center text-xs text-[#737987]">
                            Add a card before logging an expense.
                        </p>
                    )}
                </div>
            </form>
        </div>
    );

    return frame ? createPortal(sheet, frame) : sheet;
};

export default AddTransactionPopup;
