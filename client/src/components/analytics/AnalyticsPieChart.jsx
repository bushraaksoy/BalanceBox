import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { getTransactionSummary } from '../../services/analyticsService';
import { useAuthContext } from '../../context/AuthContext';

const AnalyticsPieChart = () => {
    const { userId } = useAuthContext();
    const COLORS = ['#003f5c', '#58508d', '#ff6361'];
    // const COLORS = ['#55a1ff', '#ef6356', '#ffc861']; // similar to icon
    // const COLORS = ['#b5a03d', '#6a6239', '#f7bd03']; // olive green palete
    // const COLORS = ['#00aaff', '#ef6356', '#00cc00']; // red green blue

    const { data: rawData, isLoading } = useQuery({
        queryKey: ['transactionSummary'],
        queryFn: () => getTransactionSummary(userId),
    });

    const data = rawData
        ? [
              { name: 'INCOME', value: rawData.totalIncome },
              { name: 'EXPENSE', value: rawData.totalSpending },
              { name: 'SAVING', value: rawData.totalSaving },
          ]
        : [];

    return (
        <div className="py-6">
            <PieChart width={350} height={100} className="flex">
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    fill="#8884d8"
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
                    verticalAlign="center"
                />
            </PieChart>
        </div>
    );
};

export default AnalyticsPieChart;
