import { createContext, useContext, useEffect, useState } from 'react';
import {
    CURRENCY_KEY,
    THEME_KEY,
    applyTheme,
    currencyByCode,
} from '../constants/preferences';

const PreferencesContext = createContext({
    theme: 'light',
    setTheme: () => {},
    currency: 'KZT',
    setCurrency: () => {},
    symbol: '₸',
    isDark: false,
});

export const usePreferences = () => useContext(PreferencesContext);

const readTheme = () => localStorage.getItem(THEME_KEY) || 'light';
const readCurrency = () => localStorage.getItem(CURRENCY_KEY) || 'KZT';

const PreferencesProvider = ({ children }) => {
    const [theme, setTheme] = useState(readTheme);
    const [currency, setCurrency] = useState(readCurrency);
    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains('dark')
    );

    useEffect(() => {
        localStorage.setItem(THEME_KEY, theme);
        setIsDark(applyTheme(theme));
    }, [theme]);

    useEffect(() => {
        if (theme !== 'system') return undefined;
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = () => setIsDark(applyTheme('system'));
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem(CURRENCY_KEY, currency);
    }, [currency]);

    return (
        <PreferencesContext.Provider
            value={{
                theme,
                setTheme,
                currency,
                setCurrency,
                symbol: currencyByCode(currency).symbol,
                isDark,
            }}
        >
            {children}
        </PreferencesContext.Provider>
    );
};

export default PreferencesProvider;
