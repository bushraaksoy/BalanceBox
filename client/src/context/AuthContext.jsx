import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext({
    userId: '',
    setUserId: () => {},
    isAdmin: '',
    setIsAdmin: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useLocalStorage('userId');
    const [isAdmin, setIsAdmin] = useLocalStorage('isAdmin');
    return (
        <AuthContext.Provider value={{ userId, setUserId, isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

// TODO: Learn more about context
