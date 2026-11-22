import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { getUserExpenses } from '../../services/expenseService';
import AddExpenseDrawer from '../drawers/AddExpenseDrawer';
import { FiPlusCircle } from 'react-icons/fi';
import NoExpensesMessage from '../messages/NoExpensesMessage';
import { useQuery } from '@tanstack/react-query';
import ExpenseDetails from '../drawers/ExpenseDetails';
import MyExpensesSkeleton from '../../skeletons/MyExpensesSkeleton';
import ViewAllButton from '../buttons/ViewAllButton';
import BudgetingExpenseItem from './BudgetingExpenseItem';
import SubHeading from '../ui/SubHeading';

const MyExpenses = ({ className = '' }) => {
    const { userId } = useAuthContext();
    const { data: expenses, isLoading, isError } = useQuery({
        queryKey: ['expenses'],
        queryFn: () => getUserExpenses(userId),
        staleTime: Infinity,
    });

    if (isLoading) {
        return <MyExpensesSkeleton />;
    }

    const list = Array.isArray(expenses) ? expenses : [];

    return (
        <div className={className}>
            <div className="flex justify-between items-center">
                <SubHeading className="!py-1 !text-sm">My Expenses</SubHeading>
                <AddExpenseDrawer trigger={<FiPlusCircle size={22} />} />
            </div>
            <div className="expense-items flex flex-col">
                {isError ? (
                    <p className="py-3 text-sm text-[#737987]">
                        Couldn't load your expenses.
                    </p>
                ) : list.length > 0 ? (
                    list.map((expense) => (
                            <ExpenseDetails
                                key={expense.id}
                                expense={expense}
                                trigger={
                                    <BudgetingExpenseItem
                                        category={expense.category}
                                        title={expense.title}
                                        amount={expense.amount}
                                        frequency={expense.frequency}
                                    />
                                }
                            />
                        ))
                ) : (
                    <NoExpensesMessage />
                )}
                {/* {expenses?.length > 0 && <ViewAllButton to={'/expenses'} />} */}
            </div>
        </div>
    );
};

export default MyExpenses;
