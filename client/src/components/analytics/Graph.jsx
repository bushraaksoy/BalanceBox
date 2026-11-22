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
import { usePreferences } from '../../context/PreferencesContext';
import { getAnalyticsTransactions } from '../../services/analyticsService';
import Currency from '../Currency';
import { chartColors } from './chartColors';

const Graph = () => {
    const { userId } = useAuthContext();
    const { isDark } = usePreferences();
    const grid = isDark ? '#52525b' : '#e7e5e4';
    const axis = isDark ? '#c8c8d0' : '#78716c';

    const { data: transactions, isLoading } = useQuery({
        queryKey: ['analytics-transactions'],
        queryFn: () => getAnalyticsTransactions(userId),
    });

    return (
        <div className="h-64 text-xs">
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={transactions}>
            <CartesianGrid stroke={grid} strokeDasharray="3 3" />
            <XAxis
                dataKey="date"
                tick={{ fill: axis, fontSize: 11 }}
                axisLine={{ stroke: grid }}
                tickLine={false}
            />

            <Tooltip
                contentStyle={{
                    borderRadius: 12,
                    border: `1px solid ${grid}`,
                    background: isDark ? '#1c1c1e' : '#ffffff',
                    color: isDark ? '#f4f4f5' : '#171717',
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
            <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: 11, color: isDark ? '#f4f4f5' : '#171717' }}
            />
            <Area
                dot={false}
                type="monotone"
                dataKey="amount"
                stroke={chartColors.series}
                fill={chartColors.series}
                fillOpacity={0.18}
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
