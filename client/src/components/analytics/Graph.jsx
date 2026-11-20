import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
    Legend,
    Tooltip,
    YAxis,
    XAxis,
    CartesianGrid,
    Area,
    AreaChart,
} from 'recharts';
import { useAuthContext } from '../../context/AuthContext';
import { getAnalyticsTransactions } from '../../services/analyticsService';
import Currency from '../Currency';

const Graph = () => {
    const { userId } = useAuthContext();

    const { data: transactions, isLoading } = useQuery({
        queryKey: ['analytics-transactions'],
        queryFn: () => getAnalyticsTransactions(userId),
    });

    return (
        <AreaChart
            className="text-xs p-2"
            width={350}
            height={250}
            data={transactions}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />

            <Tooltip
                stroke="#000000"
                formatter={(value, name) => [
                    name == 'amount' && (
                        <>
                            <Currency /> {value}
                        </>
                    ),
                    (name = 'Amount'),
                ]}
            />
            <Legend />
            <Area
                dot={false}
                type="monotone"
                dataKey="amount"
                stroke="#003f5c"
                fill="#003f5c"
                fillOpacity={0.4}
                strokeWidth={2}
                isAnimationActive={false}
            />
        </AreaChart>
    );
};

export default Graph;

const formatNumber = (value) => {
    if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(2) + 'M';
    } else if (value >= 1_000) {
        return (value / 1_000).toFixed(2) + 'K';
    }
    return value.toFixed(2);
};
