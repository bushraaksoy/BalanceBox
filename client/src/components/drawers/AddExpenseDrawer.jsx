import React, { useState } from 'react';
import VaulDrawer from './Drawer';
import DrawerInput from '../inputs/DrawerInput';
import DrawerButton from '../buttons/DrawerButton';
import { useAuthContext } from '../../context/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addExpense } from '../../services/expenseService';
import DrawerSelectInput from '../inputs/DrawerSelectInput';
import Loader from '../Loader';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { MdOutlineTitle } from 'react-icons/md';
import { BsCash, BsChatLeftText } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi';
import { TbCategory } from 'react-icons/tb';

const AddExpenseDrawer = ({ trigger }) => {
    const queryClient = useQueryClient();
    const { userId } = useAuthContext();
    const [formData, setFormData] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const { mutate, isLoading } = useMutation({
        mutationFn: () => addExpense(userId, formData),
        onSuccess: (data) => {
            console.log('Expense added successfully:', data);
            toast.success('New Expense Added!');
            queryClient.invalidateQueries([
                'expenses',
                'balanceOverview',
                'budgetRemainder',
            ]);
            setIsOpen(false);
        },
        onError: (error) => {
            console.error('Error adding expense:', error);
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
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            title="Add New Expense"
            trigger={trigger}
        >
            <div className="content">
                <form
                    onSubmit={handleSubmit}
                    className="py-3 flex flex-col gap-3 h-full"
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
                            type="select"
                            name={'frequency'}
                            id={'frequency'}
                            placeholder={'Frequency'}
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
                            type="select"
                            name={'category'}
                            id={'category'}
                            placeholder={'Category'}
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
                    <DrawerButton title="Add" />
                </form>
            </div>
        </VaulDrawer>
    );
};

export default AddExpenseDrawer;
