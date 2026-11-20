import React from 'react';
import SubpageLayout from '../../layouts/SubpageLayout';
import { useAuthContext } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getUserExpenses } from '../../services/expenseService';
import MyExpensesSkeleton from '../../skeletons/MyExpensesSkeleton';
import ExpenseDetails from '../../components/drawers/ExpenseDetails';
import BudgetingExpenseItem from '../../components/expense/BudgetingExpenseItem';
import NoExpensesMessage from '../../components/messages/NoExpensesMessage';
import AddExpenseDrawer from '../../components/drawers/AddExpenseDrawer';
import { FiPlusCircle } from 'react-icons/fi';

const Expenses = () => {
    const { userId } = useAuthContext();
    const { data: expenses, isLoading } = useQuery({
        queryKey: ['expenses'],
        queryFn: () => getUserExpenses(userId),
        staleTime: Infinity,
    });

    if (isLoading) {
        return <MyExpensesSkeleton />;
    }

    return (
        <SubpageLayout heading={'My Expenses'}>
            <div className="flex justify-between  py-3">
                <h2 className="font-medium">All Expenses</h2>
                <AddExpenseDrawer trigger={<FiPlusCircle size={25} />} />
            </div>
            <div className="expense-items flex flex-col">
                {expenses?.length > 0 ? (
                    expenses?.map((expense) => (
                        <ExpenseDetails
                            key={expense.id}
                            expense={expense}
                            trigger={
                                <BudgetingExpenseItem
                                    category={expense.category}
                                    title={expense.title}
                                    amount={expense.amount}
                                />
                            }
                        />
                    ))
                ) : (
                    <NoExpensesMessage />
                )}
            </div>
        </SubpageLayout>
    );
};

export default Expenses;
