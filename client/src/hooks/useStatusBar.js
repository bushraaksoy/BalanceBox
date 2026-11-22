import { useLayoutEffect } from 'react';
import { applyStatusBar, statusBarColor } from '../constants/preferences';
import { usePreferences } from '../context/PreferencesContext';

const useStatusBar = (kind = 'bar') => {
    const { isDark } = usePreferences();
    const color = statusBarColor(kind, isDark);

    useLayoutEffect(() => {
        applyStatusBar(color);
    }, [color]);
};

export default useStatusBar;
