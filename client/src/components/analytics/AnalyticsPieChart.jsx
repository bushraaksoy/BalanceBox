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

const AnalyticsPieChart = () => {
    const { userId } = useAuthContext();
    const COLORS = ['#efb100', '#44403c', '#a8a29e'];

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
                    fill="#efb100"
                    stroke="none"
                >
                    {data?.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip />
                <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                />
            </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AnalyticsPieChart;
