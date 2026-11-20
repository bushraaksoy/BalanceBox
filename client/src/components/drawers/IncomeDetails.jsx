import React, { useState } from 'react';
import VaulDrawer from './Drawer';
import DrawerInput from '../inputs/DrawerInput';
import DrawerSelectInput from '../inputs/DrawerSelectInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteIncome, editIncome } from '../../services/incomeService';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';
import SaveButton from '../buttons/SaveButton';
import DeleteButton from '../buttons/DeleteButton';
import AmountInput from '../inputs/AmountInput';
import { FcTemplate } from 'react-icons/fc';
import { BsCash, BsChatLeftText } from 'react-icons/bs';
import { MdOutlineTitle } from 'react-icons/md';
import { CiClock2, CiCreditCard1, CiMoneyBill } from 'react-icons/ci';
import { FiClock } from 'react-icons/fi';
import { TbCategory, TbCategoryFilled } from 'react-icons/tb';

const IncomeDetails = ({ trigger, income }) => {
    const { userId } = useAuthContext();
    const [formData, setFormData] = useState(income);
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: cards, isCardsLoading } = useQuery({
        queryKey: ['cards'],
        queryFn: () => getCards(userId),
    });

    const { mutate: editIncomeMutation, isEditLoading } = useMutation({
        mutationFn: () => editIncome(userId, income.id, formData),
        onSuccess: (data) => {
            console.log('Income updated successfully!', data);
            toast.success('Income Updated!');
            queryClient.invalidateQueries([
                'incomes',
                'balanceOverview',
                'budgetRemainder',
                'cards',
            ]);
            setIsOpen(false);
        },
        onError: (error) => {
            console.log('Error updating income.', error);
            toast.error('Failed to update');
        },
    });

    const { mutate: deleteIncomeMutation, isDeleteLoading } = useMutation({
        mutationFn: () => deleteIncome(userId, income.id),
        onSuccess: (data) => {
            console.log('Income deleted successfully!', data);
            toast.success('Income Deleted');
            queryClient.invalidateQueries([
                'incomes',
                'balanceOverview',
                'budgetRemainder',
                'cards',
            ]);
            setIsOpen(false);
        },
        onError: (error) => {
            console.log('Error deleting income.', error);
            toast.error('Failed to delete');
        },
    });

    const handleEdit = (e) => {
        e.preventDefault();
        editIncomeMutation();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteIncomeMutation();
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
            title={income.title}
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
                        value={formData.description || ''}
                        onChange={handleChange}
                    />
                    <AmountInput
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
                        value={formData.amount}
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
                            value={formData.frequency || ''}
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
                            value={formData.category || ''}
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
                        value={formData.cardId || ''}
                        onChange={handleChange}
                    >
                        <option value="">Select Card</option>
                        {cards?.map((card) => {
                            return (
                                <option key={card.id} value={card.id}>
                                    {card.title}
                                </option>
                            );
                        })}
                    </DrawerSelectInput>
                    <div className="py-2 flex gap-2 ">
                        <SaveButton onClick={handleEdit} />
                        <DeleteButton onClick={handleDelete} />
                    </div>
                </form>
            </div>
        </VaulDrawer>
    );
};

export default IncomeDetails;
