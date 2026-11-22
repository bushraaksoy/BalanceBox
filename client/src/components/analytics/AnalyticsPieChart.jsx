import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { getTransactionSummary } from '../../services/analyticsService';
import { useAuthContext } from '../../context/AuthContext';
import { usePreferences } from '../../context/PreferencesContext';
import { chartColors } from './chartColors';
import { formatAmount } from '../../utils/formatAmount';
import ChartEmpty from './ChartEmpty';

const AnalyticsPieChart = () => {
    const { userId } = useAuthContext();
    const { isDark, symbol } = usePreferences();
    const { data: rawData, isLoading } = useQuery({
        queryKey: ['transactionSummary'],
        queryFn: () => getTransactionSummary(userId),
    });

    const data = [
        {
            name: 'Income',
            value: Number(rawData?.totalIncome) || 0,
            fill: chartColors.income,
        },
        {
            name: 'Expenses',
            value: Number(rawData?.totalSpending) || 0,
            fill: chartColors.expense,
        },
        {
            name: 'Savings',
            value: Number(rawData?.totalSaving) || 0,
            fill: chartColors.saving,
        },
    ].filter((slice) => slice.value > 0);

    if (isLoading) {
        return <div className="h-32 animate-pulse rounded-xl bg-[#F3F4F6]" />;
    }

    if (!data.length) {
        return (
            <ChartEmpty>
                Log income or an expense to see how they compare.
            </ChartEmpty>
        );
    }

    return (
        <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    fill={chartColors.income}
                    stroke="none"
                >
                    {data.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        borderRadius: 12,
                        border: `1px solid ${isDark ? '#3f3f46' : '#e8e9ed'}`,
                        background: isDark ? '#1c1c1e' : '#ffffff',
                        color: isDark ? '#f4f4f5' : '#171717',
                        fontSize: 12,
                    }}
                    formatter={(value, name) => [
                        `${symbol} ${formatAmount(value)}`,
                        name,
                    ]}
                />
                <Legend
                    iconType="circle"
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{
                        fontSize: 11,
                        color: isDark ? '#f4f4f5' : '#171717',
                    }}
                />
            </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AnalyticsPieChart;
