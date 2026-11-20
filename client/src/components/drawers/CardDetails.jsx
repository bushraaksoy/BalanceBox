import React, { useState } from 'react';
import VaulDrawer from './Drawer';
import DrawerInput from '../inputs/DrawerInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';
import { deleteCard, editCard } from '../../services/cardService';
import Currency from '../Currency';
import AmountInput from '../inputs/AmountInput';
import SaveButton from '../buttons/SaveButton';
import DeleteButton from '../buttons/DeleteButton';
import { CiCreditCard1 } from 'react-icons/ci';
import { MdOutlineTitle } from 'react-icons/md';

const CardDetails = ({ trigger, card }) => {
    const { userId } = useAuthContext();
    const [formData, setFormData] = useState({
        title: card.title,
        balance: card?.balance,
        id: card.id,
    });
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutate: editCardMutation, isEditLoading } = useMutation({
        mutationFn: () => editCard(userId, card.id, formData),
        onSuccess: (data) => {
            console.log('Card updated successfully!', data);
            toast.success('Card Updated!');
            queryClient.invalidateQueries([
                'cards',
                'cardsDetails',
                'balanceOverview',
                'budgetRemainder',
            ]);
            setIsOpen(false);
        },
        onError: (error) => {
            console.log('Error updating card.', error);
            toast.error('Failed to update');
        },
    });

    const { mutate: deleteCardMutation, isDeleteLoading } = useMutation({
        mutationFn: () => deleteCard(userId, card.id),
        onSuccess: (data) => {
            console.log('Card deleted successfully!', data);
            toast.success('Card Deleted');
            queryClient.invalidateQueries([
                'cards',
                'cardsDetails',
                'balanceOverview',
                'budgetRemainder',
            ]);
            setIsOpen(false);
        },
        onError: (error) => {
            console.log('Error deleting card.', error);
            toast.error('Failed to delete');
        },
    });

    const handleEdit = (e) => {
        e.preventDefault();
        editCardMutation();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteCardMutation();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    return (
        <VaulDrawer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={card.title}
            trigger={trigger}
        >
            <div className="content py-3 flex flex-col gap-3">
                <form action="" className="py-3 flex flex-col gap-3">
                    <DrawerInput
                        label={
                            <>
                                <MdOutlineTitle />
                                Name
                            </>
                        }
                        type="text"
                        name={'title'}
                        id={'title'}
                        placeholder={'Title'}
                        value={formData?.title}
                        onChange={handleChange}
                    />
                    <AmountInput
                        label={
                            <>
                                <CiCreditCard1 />
                                Balance
                            </>
                        }
                        type="number"
                        name={'balance'}
                        id={'balance'}
                        placeholder={'Balance'}
                        value={formData?.balance}
                        onChange={handleChange}
                    />
                    <div className="py-2 flex gap-2 ">
                        <SaveButton onClick={handleEdit} />
                        <DeleteButton onClick={handleDelete} />
                    </div>
                </form>
            </div>
        </VaulDrawer>
    );
};

export default CardDetails;
