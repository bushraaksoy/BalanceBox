import prisma from '../db/db.config.js';

const daysAgo = (days) => {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCDate(date.getUTCDate() - (days - 1));
    return date;
};

const dayKey = (date) => date.toISOString().slice(0, 10);

const referrerLabel = (value) => {
    if (!value) return 'Direct';
    try {
        return new URL(value).hostname.replace(/^www\./, '');
    } catch {
        return value.slice(0, 80);
    }
};

const tally = (rows, pick) => {
    const counts = new Map();
    for (const row of rows) {
        const key = pick(row) || 'Unknown';
        counts.set(key, (counts.get(key) || 0) + 1);
    }
    return [...counts.entries()]
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count);
};

const windowStats = (rows, since) => {
    const inWindow = rows.filter((row) => row.createdAt >= since);
    const ofType = (type) => inWindow.filter((row) => row.type === type);
    const landing = ofType('landing_view');
    return {
        landingViews: landing.length,
        uniqueVisitors: new Set(landing.map((row) => row.visitorId)).size,
        installPrompts: ofType('install_prompt').length,
        standaloneOpens: ofType('standalone_open').length,
        appInstalled: ofType('app_installed').length,
    };
};

class AdminController {
    static async overview(req, res) {
        try {
            const since30 = daysAgo(30);
            const since7 = daysAgo(7);
            const [visits, totalUsers, signups7, signups30] = await Promise.all([
                prisma.visit.findMany({
                    where: { createdAt: { gte: since30 } },
                    select: {
                        type: true,
                        visitorId: true,
                        country: true,
                        device: true,
                        referrer: true,
                        createdAt: true,
                    },
                }),
                prisma.user.count({ where: { isAdmin: false } }),
                prisma.user.count({
                    where: { isAdmin: false, createdAt: { gte: since7 } },
                }),
                prisma.user.count({
                    where: { isAdmin: false, createdAt: { gte: since30 } },
                }),
            ]);

            const landing = visits.filter((row) => row.type === 'landing_view');
            const visitsByDay = [];
            for (let i = 0; i < 30; i += 1) {
                const date = new Date(since30);
                date.setUTCDate(since30.getUTCDate() + i);
                const key = dayKey(date);
                visitsByDay.push({
                    date: key,
                    views: landing.filter((row) => dayKey(row.createdAt) === key)
                        .length,
                });
            }

            return res.status(200).json({
                totalUsers,
                signups7,
                signups30,
                last7: windowStats(visits, since7),
                last30: windowStats(visits, since30),
                visitsByDay,
                countries: tally(landing, (row) => row.country).slice(0, 12),
                devices: tally(landing, (row) => row.device),
                referrers: tally(landing, (row) => referrerLabel(row.referrer)).slice(
                    0,
                    8
                ),
            });
        } catch (error) {
            console.log('Server error in admin overview: ', error);
            return res.status(500).json({ message: 'Server Error' });
        }
    }

    static async users(req, res) {
        try {
            const users = await prisma.user.findMany({
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    username: true,
                    fullname: true,
                    isAdmin: true,
                    createdAt: true,
                    lastSeenAt: true,
                    _count: {
                        select: {
                            Card: true,
                            incomes: true,
                            expenses: true,
                            savings: true,
                        },
                    },
                },
            });

            return res.status(200).json(
                users.map((user) => ({
                    id: user.id,
                    username: user.username,
                    fullname: user.fullname,
                    isAdmin: user.isAdmin,
                    createdAt: user.createdAt,
                    lastSeenAt: user.lastSeenAt,
                    cards: user._count.Card,
                    incomes: user._count.incomes,
                    expenses: user._count.expenses,
                    goals: user._count.savings,
                }))
            );
        } catch (error) {
            console.log('Server error in admin users: ', error);
            return res.status(500).json({ message: 'Server Error' });
        }
    }
}

export default AdminController;
