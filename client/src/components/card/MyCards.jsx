import React, { useState } from 'react';
import Card from './Card';
import AddCardDrawer from '../drawers/AddCardDrawer';
import { FiEye, FiEyeOff, FiPlusCircle } from 'react-icons/fi';
import AddIncome from '../income/AddIncome';
import { useQuery } from '@tanstack/react-query';
import { getCards } from '../../services/cardService';
import { useAuthContext } from '../../context/AuthContext';
import CardDetails from '../drawers/CardDetails';
import MyCardsSkeleton from '../../skeletons/MyCardsSkeleton';
import SubHeading from '../ui/SubHeading';

const MyCards = ({ className = '' }) => {
    const { userId } = useAuthContext();
    const [hidden, setHidden] = useState(false);

    const { data: cards, isLoading, isError } = useQuery({
        queryKey: ['cards'],
        queryFn: () => getCards(userId),
        staleTime: Infinity,
    });

    if (isLoading) {
        return <MyCardsSkeleton />;
    }

    const list = Array.isArray(cards) ? cards : [];

    return (
        <div className={className}>
            <div className="flex items-center justify-between">
                <SubHeading className="!py-1 !text-sm">My Cards</SubHeading>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setHidden((value) => !value)}
                        aria-label={hidden ? 'Show balances' : 'Hide balances'}
                        className="text-[#171717]"
                    >
                        {hidden ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                    {list.length > 0 && (
                        <AddCardDrawer trigger={<FiPlusCircle size={22} />} />
                    )}
                </div>
            </div>
            <div className="mt-2 flex gap-3 overflow-x-scroll">
                {isError && (
                    <p className="text-sm text-[#737987]">Couldn't load your cards.</p>
                )}
                {!isError && list.length < 1 && (
                    <AddCardDrawer trigger={<AddIncome />} />
                )}
                {list.map((card) => (
                    <CardDetails
                        card={card}
                        key={card.id}
                        trigger={
                            <Card
                                title={card.title}
                                balance={card.balance}
                                hidden={hidden}
                            />
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default MyCards;
