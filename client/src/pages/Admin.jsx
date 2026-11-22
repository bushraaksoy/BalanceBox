import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from 'recharts';
import { useAuthContext } from '../context/AuthContext';
import { getAdminOverview, getAdminUsers } from '../services/adminService';

const dayLabel = (iso) => {
    const [year, month, day] = iso.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString(
        undefined,
        { month: 'short', day: 'numeric', timeZone: 'UTC' }
    );
};

const when = (value) => {
    if (!value) return '—';
    return new Date(value).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

const Stat = ({ label, value, caption }) => (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
        <p className="text-sm text-stone-500">{label}</p>
        <p className="mt-1 text-2xl font-semibold">{value ?? '—'}</p>
        {caption && <p className="mt-1 text-xs text-stone-400">{caption}</p>}
    </div>
);

const Breakdown = ({ title, rows }) => (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <h2 className="text-sm font-medium">{title}</h2>
        {rows?.length ? (
            <ul className="mt-3 flex flex-col gap-2">
                {rows.map((row) => (
                    <li
                        key={row.label}
                        className="flex items-center justify-between text-sm"
                    >
                        <span className="text-stone-600">{row.label}</span>
                        <span className="font-medium">{row.count}</span>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="mt-3 text-sm text-stone-400">No visits yet.</p>
        )}
    </div>
);

const Admin = () => {
    const { userId, isAdmin } = useAuthContext();
    const navigate = useNavigate();
    const allowed = Boolean(userId) && userId !== 'null' && isAdmin === 'true';

    useEffect(() => {
        if (!userId || userId === 'null') navigate('/login');
        else if (isAdmin !== 'true') navigate('/');
    }, [userId, isAdmin, navigate]);

    const overview = useQuery({
        queryKey: ['admin-overview'],
        queryFn: () => getAdminOverview(userId),
        enabled: allowed,
    });
    const users = useQuery({
        queryKey: ['admin-users'],
        queryFn: () => getAdminUsers(userId),
        enabled: allowed,
    });

    const data = overview.data;
    const week = data?.last7;
    const month = data?.last30;

    return (
        <div
            className="min-h-screen bg-white text-stone-900"
            style={{ fontFamily: 'Poppins, Arial' }}
        >
            <header className="border-b border-stone-200 px-6 py-4 flex items-center justify-between">
                <div>
                    <p className="text-xs text-stone-400">BalanceBox</p>
                    <h1 className="text-xl font-semibold">Admin</h1>
                </div>
                <Link to="/" className="text-sm font-medium">
                    Back to the app
                </Link>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
                {overview.isError && (
                    <p className="text-sm text-red-500">
                        These stats are only available to the admin account.
                    </p>
                )}

                <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <Stat
                        label="Landing views"
                        value={week?.landingViews}
                        caption={`30 days: ${month?.landingViews ?? '—'}`}
                    />
                    <Stat
                        label="Unique visitors"
                        value={week?.uniqueVisitors}
                        caption={`30 days: ${month?.uniqueVisitors ?? '—'}`}
                    />
                    <Stat
                        label="Install prompts"
                        value={week?.installPrompts}
                        caption={`30 days: ${month?.installPrompts ?? '—'}`}
                    />
                    <Stat
                        label="Home screen opens"
                        value={week?.standaloneOpens}
                        caption={`Installed: ${month?.appInstalled ?? '—'}`}
                    />
                    <Stat
                        label="Signups"
                        value={data?.signups7}
                        caption={`30 days: ${data?.signups30 ?? '—'}`}
                    />
                    <Stat label="Users" value={data?.totalUsers} />
                </section>

                <section className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <h2 className="text-sm font-medium">Landing views</h2>
                    <div className="mt-4 h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={(data?.visitsByDay || []).map((row) => ({
                                    ...row,
                                    label: dayLabel(row.date),
                                }))}
                            >
                                <CartesianGrid
                                    stroke="#e7e5e4"
                                    strokeDasharray="3 3"
                                />
                                <XAxis
                                    dataKey="label"
                                    tick={{ fill: '#78716c', fontSize: 11 }}
                                    axisLine={{ stroke: '#e7e5e4' }}
                                    tickLine={false}
                                    interval={4}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: 12,
                                        border: '1px solid #e7e5e4',
                                        fontSize: 12,
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="views"
                                    stroke="#efb100"
                                    fill="#efb100"
                                    fillOpacity={0.28}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                <section className="grid md:grid-cols-3 gap-3">
                    <Breakdown title="Countries" rows={data?.countries} />
                    <Breakdown title="Devices" rows={data?.devices} />
                    <Breakdown title="Referrers" rows={data?.referrers} />
                </section>

                <section className="rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden">
                    <h2 className="px-4 pt-4 text-sm font-medium">Users</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-stone-400">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Username</th>
                                    <th className="px-4 py-3 font-medium">Name</th>
                                    <th className="px-4 py-3 font-medium">Joined</th>
                                    <th className="px-4 py-3 font-medium">Last seen</th>
                                    <th className="px-4 py-3 font-medium">Cards</th>
                                    <th className="px-4 py-3 font-medium">Income</th>
                                    <th className="px-4 py-3 font-medium">Expenses</th>
                                    <th className="px-4 py-3 font-medium">Goals</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(users.data || []).map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-t border-gray-200"
                                    >
                                        <td className="px-4 py-3">
                                            {user.username}
                                            {user.isAdmin && (
                                                <span className="ml-2 text-xs text-stone-400">
                                                    Admin
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {user.fullname || '—'}
                                        </td>
                                        <td className="px-4 py-3">
                                            {when(user.createdAt)}
                                        </td>
                                        <td className="px-4 py-3">
                                            {when(user.lastSeenAt)}
                                        </td>
                                        <td className="px-4 py-3">{user.cards}</td>
                                        <td className="px-4 py-3">{user.incomes}</td>
                                        <td className="px-4 py-3">{user.expenses}</td>
                                        <td className="px-4 py-3">{user.goals}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Admin;
