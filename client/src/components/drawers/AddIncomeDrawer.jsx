import React, { useState } from 'react';
import VaulDrawer from './Drawer';
import DrawerInput from '../inputs/DrawerInput';
import DrawerSelectInput from '../inputs/DrawerSelectInput';
import DrawerButton from '../buttons/DrawerButton';
import { useAuthContext } from '../../context/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addIncome } from '../../services/incomeService';
import Loader from '../Loader';
import { toast } from 'sonner';
import { getCards } from '../../services/cardService';
import { MdOutlineTitle } from 'react-icons/md';
import { BsCash, BsChatLeftText } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi';
import { TbCategory } from 'react-icons/tb';
import { CiCreditCard1 } from 'react-icons/ci';

const AddIncomeDrawer = ({ trigger }) => {
    const { userId } = useAuthContext();
    const [formData, setFormData] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: cards, isCardsLoading } = useQuery({
        queryKey: ['cards'],
        queryFn: () => getCards(userId),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const { mutate, isLoading } = useMutation({
        mutationFn: () => addIncome(userId, formData),
        onSuccess: (data) => {
            console.log('Income added successfully:', data);
            toast.success('New Income Added!');
            queryClient.invalidateQueries([
                'incomes',
                'balanceOverview',
                'budgetRemainder',
                'cards',
            ]);
            setIsOpen(false);
        },
        onError: (error) => {
            console.error('Error adding income:', error);
            toast.error('Failed to add income');
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
            title="Add New Income"
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
                    <DrawerInput
                        label={
                            <>
                                <BsChatLeftText />
                                Description
                            </>
                        }
                        type="text"
                        name={'description'}
                        id={'description'}
                        placeholder={'Description'}
                        onChange={handleChange}
                    />
                    <DrawerInput
                        label={
                            <>
                                <BsCash />
                                Amount
                            </>
                        }
                        type="number"
                        name={'amount'}
                        id={'amount'}
                        placeholder={'Amount'}
                        onChange={handleChange}
                    />
                    <div className="flex gap-2">
                        <DrawerSelectInput
                            label={
                                <>
                                    <FiClock />
                                    Frequency
                                </>
                            }
                            type="text"
                            name={'frequency'}
                            id={'frequency'}
                            placeholder={'Select Frequency'}
                            onChange={handleChange}
                        >
                            <option className="p-4" value="">
                                Frequency
                            </option>
                            <option value="MONTHLY">Monthly</option>
                            <option value="WEEKLY">Weekly</option>
                            <option value="YEARLY">Yearly</option>
                        </DrawerSelectInput>
                        <DrawerSelectInput
                            label={
                                <>
                                    <TbCategory />
                                    Category
                                </>
                            }
                            type="text"
                            name={'category'}
                            id={'category'}
                            placeholder={'Category'}
                            onChange={handleChange}
                        >
                            <option value="">Category</option>
                            <option value="SALARY">Salary</option>
                            <option value="ALLOWANCE">Allowance</option>
                            <option value="COMMISSION">Commission</option>
                            <option value="INVESTMENT">Investment</option>
                            <option value="INTEREST">Interest</option>
                            <option value="ROYALTY">Royalty</option>
                            <option value="FREELANCE">Freelance</option>
                            <option value="OTHER">Other</option>
                        </DrawerSelectInput>
                    </div>
                    <DrawerSelectInput
                        label={
                            <>
                                <CiCreditCard1 />
                                Card
                            </>
                        }
                        type="text"
                        name="cardId"
                        id="cardId"
                        onChange={handleChange}
                    >
                        <option value="">Select Card</option>
                        {cards?.map((card) => (
                            <option key={card.id} value={card.id}>
                                {card.title}
                            </option>
                        ))}
                    </DrawerSelectInput>
                    <DrawerButton title="Add" />
                </form>
            </div>
        </VaulDrawer>
    );
};

export default AddIncomeDrawer;
