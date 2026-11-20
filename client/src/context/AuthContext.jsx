import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext({ userId: '', setUserId: () => {} });

export const useAuthContext = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useLocalStorage('userId');
    return (
        <AuthContext.Provider value={{ userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

// TODO: Learn more about context
