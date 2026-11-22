import { useState } from 'react';
import PendingIncomesItem, { isIncomeLater } from './PendingIncomesItem';

const PendingIncomes = ({ pendingIncomes }) => {
    const [hidden, setHidden] = useState(() =>
        new Set(pendingIncomes.filter((income) => isIncomeLater(income.id)).map((income) => income.id))
    );
    const visible = pendingIncomes.filter((income) => !hidden.has(income.id));

    if (!visible.length) return null;

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-sm font-medium">Have you received these incomes?</h2>
            {visible.map((income) => (
                <PendingIncomesItem
                    key={income.id}
                    income={income}
                    onLater={(id) => setHidden((current) => new Set(current).add(id))}
                />
            ))}
        </div>
    );
};

export default PendingIncomes;
