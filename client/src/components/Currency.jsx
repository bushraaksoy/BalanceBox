import { usePreferences } from '../context/PreferencesContext';

const Currency = () => {
    const { symbol } = usePreferences();
    return <div className="inline"> {symbol} </div>;
};

export default Currency;
