import { usePreferences } from '../context/PreferencesContext';

const Currency = () => {
    const { symbol } = usePreferences();
    return <span> {symbol} </span>;
};

export default Currency;
