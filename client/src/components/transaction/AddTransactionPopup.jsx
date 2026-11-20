import React, { useState } from 'react';
import Popup from '../Popup';
import { IoIosAdd } from 'react-icons/io';
import { useAuthContext } from '../../context/AuthContext';
import { addExpenseTransaction } from '../../services/transactionService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getCards } from '../../services/cardService';
import Loader from '../Loader';
import ButtonLoader from '../ButtonLoader';
import Currency from '../Currency';
import { MdModeEdit } from 'react-icons/md';

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
        mutationFn: () => addExpenseTransaction(userId, formData),
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
        setFormData({
            ...formData,
            expenseId: expense.id,
        });
        console.log('adding transaction with the following data: ', formData);
        addTransactionMutation();
    };

    if (isLoadig) {
        return <Loader />;
    }

    return (
        <Popup visible={visible} setVisible={setVisible}>
            <h1 className="font-normal text-lg text-center py-2">
                Add <span className="font-medium">{expense?.title} </span>{' '}
                Spending
            </h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-full"
            >
                {cards?.length > 0 && (
                    <div className=" cards w-full p-3 border border-gray-400 rounded-2xl flex bg-white gap-2">
                        {cards?.map((card) => (
                            <div key={card.id}>
                                <input
                                    required
                                    value={card.id}
                                    name="cardId"
                                    onChange={handleChange}
                                    type="radio"
                                    className=""
                                />
                                <label htmlFor={card.id}> {card.title} </label>
                            </div>
                        ))}
                    </div>
                )}

                <div className="title w-full border border-gray-400 text-black py-3 text px-4 bg-white rounded-2xl flex items-center ">
                    <span className="">
                        <MdModeEdit className="text-gray-800" />
                    </span>
                    <input
                        className="w-full h-full outline-none"
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="Description (optional)"
                    />
                </div>
                <div className="amount w-full border border-gray-400 text-black py-3 text px-4 bg-white rounded-2xl flex ">
                    <span className="px-1">
                        <Currency />
                    </span>
                    <input
                        className="w-full h-full outline-none"
                        required
                        type="number"
                        step="0.001"
                        min="0"
                        name="amount"
                        onChange={handleChange}
                        placeholder="Amount"
                    />
                </div>
                <button
                    disabled={isAddLoading}
                    type="submit"
                    className="w-full  bg-yellow-500 p-3 rounded-3xl font-medium flex items-center justify-center"
                >
                    {isAddLoading ? (
                        <ButtonLoader />
                    ) : (
                        <>
                            <IoIosAdd size={25} /> Add
                        </>
                    )}
                </button>
            </form>
        </Popup>
    );
};

export default AddTransactionPopup;
