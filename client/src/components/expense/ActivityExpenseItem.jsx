import { useState } from 'react';
import { TbCategoryFilled } from 'react-icons/tb';
import { expenseCategoryIcons } from '../../constants/constants';
import Currency from '../Currency';
import Amount from '../ui/Amount';
import AddTransactionPopup from '../transaction/AddTransactionPopup';
import { toast } from 'sonner';

const spendingState = (spent, budget) => {
    if (!spent) {
        return {
            label: 'No spending',
            detail: budget ? 'Nothing logged yet' : 'No budget set',
            bar: 'bg-[#D5D8DE]',
            text: 'text-[#737987]',
            width: 0,
            percent: 0,
        };
    }

    if (!budget || spent > budget) {
        const over = spent - budget;
        const percent = budget ? Math.round((spent / budget) * 100) : 100;
        return {
            label: 'Over budget',
            detail: (
                <>
                    <Currency />
                    <Amount amount={over} /> over budget
                </>
            ),
            bar: 'bg-[#d64545]',
            text: 'text-[#b42323]',
            width: 100,
            percent,
        };
    }

    const percent = Math.round((spent / budget) * 100);
    const approaching = percent >= 80;
    return {
        label: approaching ? 'Approaching limit' : 'Within budget',
        detail: (
            <>
                <Currency />
                <Amount amount={budget - spent} /> left
            </>
        ),
        bar: approaching ? 'bg-[#E0A84A]' : 'bg-[#3d9a56]',
        text: approaching ? 'text-[#A97820]' : 'text-[#2d7a42]',
        width: percent,
        percent,
    };
};

const ActivityExpenseItem = ({ expense, canLog }) => {
    const [showPopup, setShowPopup] = useState(false);
    const spent = expense.usedAmount || 0;
    const budget = expense.amount || 0;
    const status = spendingState(spent, budget);
    const icon = expenseCategoryIcons[expense.category] || (
        <TbCategoryFilled size={16} />
    );

    const openSheet = () => {
        if (!canLog) {
            toast('Switch to the current month to log an expense');
            return;
        }
        setShowPopup(true);
    };

    return (
        <>
            <button
                type="button"
                onClick={openSheet}
                className="flex w-full flex-col gap-3 rounded-2xl border border-[#E8E9ED] bg-white p-4 text-left shadow-[0_8px_24px_rgba(23,23,23,0.04)]"
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#171717] [&_img]:h-4 [&_img]:w-4 [&_svg]:h-4 [&_svg]:w-4">
                            {icon}
                        </div>
                        <div className="min-w-0">
                            <h3 className="truncate font-medium text-[#171717]">
                                {expense.title}
                            </h3>
                            <p className="text-sm text-[#171717]">
                                <Currency />
                                <Amount amount={spent} />
                                <span className="text-[#737987]">
                                    {' '}
                                    / <Currency />
                                    <Amount amount={budget} />
                                </span>
                            </p>
                        </div>
                    </div>
                    <span className={`shrink-0 text-xs font-medium ${status.text}`}>
                        {status.percent}% used
                    </span>
                </div>
                <div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#F3F4F6]">
                        <span
                            className={`block h-full rounded-full ${status.bar}`}
                            style={{ width: `${status.width}%` }}
                        />
                    </div>
                    <p className={`mt-2 text-xs ${status.text}`}>
                        {status.label}
                        <span className="text-[#737987]"> · {status.detail}</span>
                    </p>
                </div>
            </button>
            <AddTransactionPopup
                visible={showPopup}
                setVisible={setShowPopup}
                expense={expense}
            />
        </>
    );
};

export default ActivityExpenseItem;
