import { useQuery } from '@tanstack/react-query';
import {
    Bar,
    BarChart,
    Cell,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { useAuthContext } from '../../context/AuthContext';
import { usePreferences } from '../../context/PreferencesContext';
import { getExpenseCategory } from '../../services/expenseService';
import { chartColors } from './chartColors';
import { formatAmount } from '../../utils/formatAmount';
import ChartEmpty from './ChartEmpty';

const BudgetVsSpent = () => {
    const { userId } = useAuthContext();
    const { isDark, symbol } = usePreferences();
    const { data: expenses, isLoading } = useQuery({
        queryKey: ['expenseCategory'],
        queryFn: () => getExpenseCategory(userId),
    });

    const rows = (expenses || []).map((expense) => ({
        name: expense.title.trim(),
        Budget: expense.amount || 0,
        Spent: expense.usedAmount || 0,
    }));

    if (isLoading) {
        return <div className="h-40 animate-pulse rounded-xl bg-[#F8F9FB]" />;
    }

    if (rows.length === 0) {
        return (
            <ChartEmpty>
                Add a budget to compare it with what you spend.
            </ChartEmpty>
        );
    }

    return (
        <div style={{ height: Math.max(rows.length * 72 + 36, 168) }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={rows}
                    layout="vertical"
                    margin={{ top: 8, right: 8, left: 4, bottom: 0 }}
                >
                    <XAxis type="number" hide />
                    <YAxis
                        type="category"
                        dataKey="name"
                        width={124}
                        axisLine={false}
                        tickLine={false}
                        tick={(props) => {
                            const label =
                                props.payload.value.length > 18
                                    ? `${props.payload.value.slice(0, 17)}…`
                                    : props.payload.value;
                            return (
                                <text
                                    x={props.x - 8}
                                    y={props.y}
                                    dy={4}
                                    textAnchor="end"
                                    fill={isDark ? '#c8c8d0' : '#737987'}
                                    fontSize={11}
                                >
                                    {label}
                                </text>
                            );
                        }}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: 12,
                            border: `1px solid ${isDark ? '#3f3f46' : '#E8E9ED'}`,
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
                        wrapperStyle={{
                            fontSize: 11,
                            color: isDark ? '#f4f4f5' : '#171717',
                        }}
                    />
                    <Bar
                        dataKey="Budget"
                        fill={chartColors.budget}
                        radius={[0, 8, 8, 0]}
                        barSize={8}
                    />
                    <Bar
                        dataKey="Spent"
                        fill={chartColors.spent}
                        radius={[0, 8, 8, 0]}
                        barSize={8}
                    >
                        {rows.map((row) => (
                            <Cell
                                key={row.name}
                                fill={
                                    row.Spent > row.Budget
                                        ? chartColors.over
                                        : chartColors.spent
                                }
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BudgetVsSpent;
