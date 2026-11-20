import React from 'react';
import Card from './Card';
import AddCardDrawer from '../drawers/AddCardDrawer';
import { FiPlusCircle } from 'react-icons/fi';
import AddIncome from '../income/AddIncome';
import { useQuery } from '@tanstack/react-query';
import { getCards, getCardsDetails } from '../../services/cardService';
import { useAuthContext } from '../../context/AuthContext';
import CardDetails from '../drawers/CardDetails';
import MyCardsSkeleton from '../../skeletons/MyCardsSkeleton';
import SubHeading from '../ui/SubHeading';

const MyCards = () => {
    const { userId } = useAuthContext();

    const { data: cards, isLoading } = useQuery({
        queryKey: ['cards'],
        queryFn: () => getCards(userId),
        staleTime: Infinity,
    });

    if (isLoading) {
        console.log('loading...');
        return <MyCardsSkeleton />;
    }

    return (
        <div className="cards border border-gray-200 rounded-2xl p-3 ">
            <div className="flex justify-between items-center">
                <SubHeading className="!py-1 !text-sm">My Cards</SubHeading>
                {cards?.length > 0 && (
                    <AddCardDrawer trigger={<FiPlusCircle size={22} />} />
                )}
            </div>
            <div className="flex gap-4 overflow-x-scroll">
                {cards.length < 1 && <AddCardDrawer trigger={<AddIncome />} />}
                {cards?.map((card) => (
                    <CardDetails
                        card={card}
                        key={card.id}
                        trigger={
                            <Card title={card.title} balance={card.balance} />
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default MyCards;
