import React, { useState } from 'react';
import VaulDrawer from './Drawer';
import DrawerInput from '../inputs/DrawerInput';
import DrawerSelectInput from '../inputs/DrawerSelectInput';
import DrawerButton from '../buttons/DrawerButton';
import { useAuthContext } from '../../context/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../Loader';
import { toast } from 'sonner';
import { addCard } from '../../services/cardService';
import { MdOutlineTitle } from 'react-icons/md';

const AddCardDrawer = ({ trigger }) => {
    const { userId } = useAuthContext();
    const [formData, setFormData] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const { mutate, isLoading } = useMutation({
        mutationFn: () => addCard(userId, formData),
        onSuccess: (data) => {
            console.log('Card added successfully:', data);
            toast.success('New Card Added!');
            queryClient.invalidateQueries([
                'cards',
                'cardsDetails',
                'balanceOverview',
                'budgetRemainder',
            ]);
            setIsOpen(false);
        },
        onError: (error) => {
            console.error('Error adding card:', error);
            toast.error('Could not add Card');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate();
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <VaulDrawer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Add New Card"
            trigger={trigger}
        >
            <div className="content py-3 flex flex-col gap-3">
                <form
                    onSubmit={handleSubmit}
                    action=""
                    className="py-3 flex flex-col gap-3"
                >
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
                        onChange={handleChange}
                    />
                    <DrawerButton title="Add" />
                </form>
            </div>
        </VaulDrawer>
    );
};

export default AddCardDrawer;
