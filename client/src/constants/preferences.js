export const THEME_KEY = 'balancebox-theme';
export const CURRENCY_KEY = 'balancebox-currency';

export const themes = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'system', label: 'System' },
];

export const currencies = [
    { code: 'AUD', symbol: 'A$', label: 'Australian dollar' },
    { code: 'BRL', symbol: 'R$', label: 'Brazilian real' },
    { code: 'GBP', symbol: '£', label: 'British pound' },
    { code: 'BIF', symbol: 'FBu', label: 'Burundian franc' },
    { code: 'CAD', symbol: 'C$', label: 'Canadian dollar' },
    { code: 'XAF', symbol: 'FCFA', label: 'Central African CFA franc' },
    { code: 'CNY', symbol: '¥', label: 'Chinese yuan' },
    { code: 'EGP', symbol: 'E£', label: 'Egyptian pound' },
    { code: 'ETB', symbol: 'Br', label: 'Ethiopian birr' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'GHS', symbol: '₵', label: 'Ghanaian cedi' },
    { code: 'INR', symbol: '₹', label: 'Indian rupee' },
    { code: 'JPY', symbol: '¥', label: 'Japanese yen' },
    { code: 'KZT', symbol: '₸', label: 'Kazakhstani tenge' },
    { code: 'KES', symbol: 'KSh', label: 'Kenyan shilling' },
    { code: 'MWK', symbol: 'MK', label: 'Malawian kwacha' },
    { code: 'MXN', symbol: 'MX$', label: 'Mexican peso' },
    { code: 'MAD', symbol: 'DH', label: 'Moroccan dirham' },
    { code: 'MZN', symbol: 'MT', label: 'Mozambican metical' },
    { code: 'NGN', symbol: '₦', label: 'Nigerian naira' },
    { code: 'RUB', symbol: '₽', label: 'Russian ruble' },
    { code: 'RWF', symbol: 'FRw', label: 'Rwandan franc' },
    { code: 'SAR', symbol: 'SR', label: 'Saudi riyal' },
    { code: 'ZAR', symbol: 'R', label: 'South African rand' },
    { code: 'KRW', symbol: '₩', label: 'South Korean won' },
    { code: 'CHF', symbol: 'Fr', label: 'Swiss franc' },
    { code: 'TZS', symbol: 'TSh', label: 'Tanzanian shilling' },
    { code: 'TRY', symbol: '₺', label: 'Turkish lira' },
    { code: 'AED', symbol: 'AED', label: 'UAE dirham' },
    { code: 'UGX', symbol: 'USh', label: 'Ugandan shilling' },
    { code: 'USD', symbol: '$', label: 'US dollar' },
    { code: 'XOF', symbol: 'CFA', label: 'West African CFA franc' },
    { code: 'ZMW', symbol: 'ZK', label: 'Zambian kwacha' },
];

export const currencyByCode = (code) =>
    currencies.find((item) => item.code === code) ||
    currencies.find((item) => item.code === 'KZT');

export const resolveDark = (theme) =>
    theme === 'dark' ||
    (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

export const statusBarColor = (kind, isDark) => {
    if (kind === 'page') return isDark ? '#111113' : '#F8F9FB';
    if (kind === 'landing') return isDark ? '#111113' : '#f4f3f0';
    if (kind === 'auth') return isDark ? '#111113' : '#f9fafb';
    return isDark ? '#1c1c1e' : '#ffffff';
};

export const applyStatusBar = (color) => {
    document.documentElement.style.setProperty('--status-bar', color);
    document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', color);
};

export const applyTheme = (theme) => {
    const dark = resolveDark(theme);
    document.documentElement.classList.toggle('dark', dark);
    return dark;
};
