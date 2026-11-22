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
import { chartColors } from './chartColors';
import { formatAmount } from '../../utils/formatAmount';
import ChartEmpty from './ChartEmpty';

const Graph = () => {
    const { userId } = useAuthContext();
    const { isDark, symbol } = usePreferences();
    const grid = isDark ? '#52525b' : '#e7e5e4';
    const axis = isDark ? '#c8c8d0' : '#78716c';

    const { data: transactions, isLoading } = useQuery({
        queryKey: ['analytics-transactions'],
        queryFn: () => getAnalyticsTransactions(userId),
    });

    const points = (transactions || []).map((point) => ({
        ...point,
        amount: Number(point.amount) || 0,
    }));
    const hasSpending = points.some((point) => point.amount > 0);

    if (isLoading) {
        return <div className="h-40 animate-pulse rounded-xl bg-[#F3F4F6]" />;
    }

    if (!hasSpending) {
        return (
            <ChartEmpty>
                Spending from the last 30 days will show up here.
            </ChartEmpty>
        );
    }

    return (
        <div className="h-64 text-xs">
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points}>
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
                formatter={(value) => [`${symbol} ${formatAmount(value)}`, 'Amount']}
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
