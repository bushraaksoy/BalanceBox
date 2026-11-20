import React, { useState } from 'react';
import Popup from '../Popup';
import { IoIosAdd } from 'react-icons/io';
import { useAuthContext } from '../../context/AuthContext';
import { addExpenseTransaction } from '../../services/transactionService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getCards } from '../../services/cardService';
import ButtonLoader from '../ButtonLoader';
import Currency from '../Currency';
import { IoChevronDown } from 'react-icons/io5';

const AddTransactionPopup = ({ visible, setVisible, expense }) => {
    console.log(expense);
    const { userId } = useAuthContext();
    const [formData, setFormData] = useState({});
    const queryClient = useQueryClient();

    const { data: cards, isLoadig } = useQuery({
        queryFn: () => getCards(userId),
        queryKey: ['cards'],
    });

    const { mutate: addTransactionMutation, isAddLoading } = useMutation({
        mutationFn: (payload) => addExpenseTransaction(userId, payload),
        onSuccess: (data) => {
            toast.success('Transaction added!');
            console.log('Transaction added successfully:', data);
            clearForm();
            setVisible(false);
            queryClient.invalidateQueries([
                'expenseCategory',
                'balanceOverview',
                'transactions',
                'cardsDetails',
            ]);
        },
        onError: (error) => {
            console.error('Error adding income:', error);
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const clearForm = () => {
        setFormData({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            expenseId: expense.id,
        };
        setFormData(payload);
        addTransactionMutation(payload);
    };

    const fieldClass =
        'w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none';

    return (
        <Popup visible={visible} setVisible={setVisible}>
            <h1 className="font-semibold tracking-tight text-center">
                Add {expense?.title} spending
            </h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-full text-left"
            >
                {cards?.length > 0 && (
                    <label className="block">
                        <span className="text-xs text-stone-500">Card</span>
                        <div className="relative mt-1">
                            <select
                                required
                                name="cardId"
                                value={formData.cardId || ''}
                                onChange={handleChange}
                                className={`${fieldClass} appearance-none pr-8`}
                            >
                                <option value="">Select a card</option>
                                {cards.map((card) => (
                                    <option key={card.id} value={card.id}>
                                        {card.title}
                                    </option>
                                ))}
                            </select>
                            <IoChevronDown
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                                size={16}
                            />
                        </div>
                    </label>
                )}

                <label className="block">
                    <span className="text-xs text-stone-500">Description</span>
                    <input
                        className={`${fieldClass} mt-1`}
                        type="text"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleChange}
                        placeholder="Optional"
                    />
                </label>

                <label className="block">
                    <span className="text-xs text-stone-500">Amount</span>
                    <div className="relative mt-1">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone-500">
                            <Currency />
                        </span>
                        <input
                            className={`${fieldClass} pl-8`}
                            required
                            type="number"
                            step="0.001"
                            min="0"
                            name="amount"
                            value={formData.amount || ''}
                            onChange={handleChange}
                            placeholder="0"
                        />
                    </div>
                </label>
                <button
                    disabled={isAddLoading || isLoadig}
                    type="submit"
                    className="w-full bg-yellow-500 mt-1 py-2.5 rounded-full font-medium flex items-center justify-center"
                >
                    {isAddLoading ? (
                        <ButtonLoader />
                    ) : (
                        <>
                            <IoIosAdd size={22} /> Add
                        </>
                    )}
                </button>
            </form>
        </Popup>
    );
};

export default AddTransactionPopup;
