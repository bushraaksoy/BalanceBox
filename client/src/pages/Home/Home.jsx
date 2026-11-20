import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import BalanceCard from '../../components/card/BalanceCard';
import TransactionHistory from '../../components/transaction/TransactionHistory';

const Home = () => {
    return (
        <MainLayout>
            <div className="flex flex-col gap-5">
                <BalanceCard />
                <TransactionHistory />
            </div>
        </MainLayout>
    );
};

export default Home;
