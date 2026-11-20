import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
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
        <div className="h-64 text-xs">
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={transactions}>
            <CartesianGrid stroke="#e7e5e4" strokeDasharray="3 3" />
            <XAxis
                dataKey="date"
                tick={{ fill: '#78716c', fontSize: 11 }}
                axisLine={{ stroke: '#e7e5e4' }}
                tickLine={false}
            />

            <Tooltip
                contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #e7e5e4',
                    fontSize: 12,
                }}
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
                stroke="#efb100"
                fill="#efb100"
                fillOpacity={0.28}
                strokeWidth={2}
                isAnimationActive={false}
            />
        </AreaChart>
        </ResponsiveContainer>
        </div>
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
