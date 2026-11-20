import React, { useState } from 'react';
import VaulDrawer from './Drawer';
import DrawerInput from '../inputs/DrawerInput';
import DrawerSelectInput from '../inputs/DrawerSelectInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';
import { deleteExpense, editExpense } from '../../services/expenseService';
import AmountInput from '../inputs/AmountInput';
import SaveButton from '../buttons/SaveButton';
import DeleteButton from '../buttons/DeleteButton';
import { MdOutlineTitle } from 'react-icons/md';
import { BsCash, BsChatLeftText } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi';
import { TbCategory } from 'react-icons/tb';

const ExpenseDetails = ({ trigger, expense }) => {
    const { userId } = useAuthContext();
    const [formData, setFormData] = useState(expense);
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutate: editExpenseMutation, isEditLoading } = useMutation({
        mutationFn: () => editExpense(userId, expense.id, formData),
        onSuccess: (data) => {
            console.log('Expense updated successfully!', data);
            toast.success('Expense Updated!');
            queryClient.invalidateQueries([
                'expenses',
                'balanceOverview',
                'budgetRemainder',
            ]);
            setIsOpen(false);
        },
        onError: (error) => {
            console.log('Error updating expense.', error);
            toast.error('Failed to update');
        },
    });

    const { mutate: deleteExpenseMutation, isDeleteLoading } = useMutation({
        mutationFn: () => deleteExpense(userId, expense.id),
        onSuccess: (data) => {
            console.log('Expense deleted successfully!', data);
            toast.success('Expense Deleted');
            queryClient.invalidateQueries([
                'expenses',
                'balanceOverview',
                'budgetRemainder',
            ]);
            setIsOpen(false);
        },
        onError: (error) => {
            console.log('Error deleting expense.', error);
            toast.error('Failed to delete');
        },
    });

    const handleEdit = (e) => {
        e.preventDefault();
        editExpenseMutation();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteExpenseMutation();
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
            title={expense.title}
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
                            <option value="HOUSING">Housing</option>
                            <option value="TRANSPORT">Transport</option>
                            <option value="HEALTH">Health</option>
                            <option value="GROCERIES">Groceries</option>
                            <option value="FOOD">Food</option>
                            <option value="SHOPPING">Shopping</option>
                            <option value="INSURANCE">Insurance</option>
                            <option value="ENTERTAINMENT">Entertainment</option>
                            <option value="SUBSCRIPTION">Subscription</option>
                            <option value="OTHER">Other</option>
                        </DrawerSelectInput>
                    </div>
                    <div className="py-2 flex gap-2 ">
                        <SaveButton onClick={handleEdit} />
                        <DeleteButton onClick={handleDelete} />
                    </div>
                </form>
            </div>
        </VaulDrawer>
    );
};

export default ExpenseDetails;
