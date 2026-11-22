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

const AnalyticsPieChart = () => {
    const { userId } = useAuthContext();
    const { isDark } = usePreferences();
    const COLORS = [chartColors.income, chartColors.expense, chartColors.saving];

    const { data: rawData, isLoading } = useQuery({
        queryKey: ['transactionSummary'],
        queryFn: () => getTransactionSummary(userId),
    });

    const data = rawData
        ? [
              { name: 'Income', value: rawData.totalIncome },
              { name: 'Expenses', value: rawData.totalSpending },
              { name: 'Savings', value: rawData.totalSaving },
          ]
        : [];

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
                    {data?.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
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
