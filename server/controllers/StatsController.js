import geoip from 'geoip-lite';
import prisma from '../db/db.config.js';

const EVENT_TYPES = new Set([
    'landing_view',
    'install_prompt',
    'app_installed',
    'standalone_open',
]);

const DAILY_TYPES = new Set([
    'landing_view',
    'install_prompt',
    'standalone_open',
]);

const VISITOR_ID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });
const hits = new Map();

const clientIp = (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded.length) {
        return forwarded.split(',')[0].trim();
    }
    return req.ip;
};

const deviceFromAgent = (agent = '') =>
    /mobile|android|iphone|ipad|ipod/i.test(agent) ? 'mobile' : 'desktop';

const countryFromIp = (ip) => {
    const lookup = geoip.lookup(ip);
    const code = lookup?.country;
    if (!code) return null;
    try {
        return countryNames.of(code) || code;
    } catch {
        return code;
    }
};

const clip = (value, max) => {
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    if (!trimmed) return null;
    return trimmed.slice(0, max);
};

const startOfUtcDay = () => {
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    return start;
};

const limited = (ip) => {
    const now = Date.now();
    const entry = hits.get(ip);
    if (!entry || now - entry.start > 60_000) {
        hits.set(ip, { start: now, count: 1 });
        return false;
    }
    entry.count += 1;
    return entry.count > 60;
};

class StatsController {
    static async recordEvent(req, res) {
        try {
            const ip = clientIp(req);
            if (limited(ip)) {
                return res.status(429).json({ message: 'Too many events' });
            }

            const { visitorId, type } = req.body || {};
            if (!VISITOR_ID.test(visitorId || '') || !EVENT_TYPES.has(type)) {
                return res.status(400).json({ message: 'Invalid event' });
            }

            const dayStart = startOfUtcDay();
            const existing = await prisma.visit.findFirst({
                where: {
                    visitorId,
                    type,
                    ...(DAILY_TYPES.has(type)
                        ? { createdAt: { gte: dayStart } }
                        : {}),
                },
            });
            if (existing) {
                return res.status(200).json({ recorded: false });
            }

            const headerUserId = req.headers['user-id'];
            let userId = null;
            if (typeof headerUserId === 'string' && headerUserId) {
                const user = await prisma.user.findUnique({
                    where: { id: headerUserId },
                    select: { id: true },
                });
                userId = user?.id || null;
            }

            const path = clip(req.body.path, 200);
            await prisma.visit.create({
                data: {
                    visitorId,
                    userId,
                    type,
                    path: path?.startsWith('/') ? path : null,
                    country: countryFromIp(ip),
                    timezone: clip(req.body.timezone, 64),
                    language: clip(req.body.language, 32),
                    referrer: clip(req.body.referrer, 300),
                    device: deviceFromAgent(req.headers['user-agent']),
                },
            });

            return res.status(201).json({ recorded: true });
        } catch (error) {
            console.log('Server error in recordEvent: ', error);
            return res.status(500).json({ message: 'Server Error' });
        }
    }
}

export default StatsController;
