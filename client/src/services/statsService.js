import axios from 'axios';

const base_url = import.meta.env.VITE_APP_API_BASE_URL;
const visitorKey = 'visitorId';

const visitorId = () => {
    const current = localStorage.getItem(visitorKey);
    if (current && current !== 'null') return current;
    const next = crypto.randomUUID();
    localStorage.setItem(visitorKey, next);
    return next;
};

const alreadySent = (type) => {
    const key = `stat:${type}:${new Date().toISOString().slice(0, 10)}`;
    if (type === 'app_installed') {
        if (localStorage.getItem('stat:app_installed') === '1') return true;
        localStorage.setItem('stat:app_installed', '1');
        return false;
    }
    if (localStorage.getItem(key) === '1') return true;
    localStorage.setItem(key, '1');
    return false;
};

export const trackEvent = (type) => {
    if (alreadySent(type)) return;
    const userId = localStorage.getItem('userId');
    axios
        .post(
            `${base_url}/stats/event`,
            {
                visitorId: visitorId(),
                type,
                path: window.location.pathname,
                language: navigator.language,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                referrer: document.referrer,
            },
            {
                headers:
                    userId && userId !== 'null' ? { 'user-id': userId } : {},
            }
        )
        .catch(() => {});
};
