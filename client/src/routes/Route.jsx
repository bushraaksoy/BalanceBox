import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import { useAuthContext } from '../context/AuthContext';
import Savings from '../pages/Savings';
import Login from '../pages/Login';
import Analytics from '../pages/Analytics';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';
import BudgetPlanner from '../pages/BudgetPlanner';
import Notifications from '../pages/Notifications';
import EditProfile from '../pages/EditProfile';
import Activity from '../pages/Activity';
import Incomes from '../pages/Incomes';
import Expenses from '../pages/Expenses';
import Transactions from '../pages/Transactions';
import Chat from '../pages/Chat';
import Admin from '../pages/Admin';
import Settings from '../pages/Settings';
import ErrorPage from '../pages/Error';

const RootPage = () => {
    const { userId } = useAuthContext();
    if (!userId || userId === 'null') return <Landing />;
    return <Home />;
};

const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />,
        children: [
    {
        path: '/',
        element: <RootPage />,
    },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    {
        path: '/savings',
        element: (
            <ProtectedRoute>
                <Savings />
            </ProtectedRoute>
        ),
    },
    {
        path: '/analytics',
        element: (
            <ProtectedRoute>
                <Analytics />
            </ProtectedRoute>
        ),
    },
    {
        path: '/account',
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
    },
    {
        path: '/budgeting',
        element: (
            <ProtectedRoute>
                <BudgetPlanner />
            </ProtectedRoute>
        ),
    },
    {
        path: '/notifications',
        element: (
            <ProtectedRoute>
                <Notifications />
            </ProtectedRoute>
        ),
    },
    {
        path: '/settings/:section',
        element: (
            <ProtectedRoute>
                <Settings />
            </ProtectedRoute>
        ),
    },
    {
        path: '/edit-profile',
        element: (
            <ProtectedRoute>
                <EditProfile />
            </ProtectedRoute>
        ),
    },
    {
        path: '/activity',
        element: (
            <ProtectedRoute>
                <Activity />
            </ProtectedRoute>
        ),
    },
    {
        path: '/incomes',
        element: (
            <ProtectedRoute>
                <Incomes />
            </ProtectedRoute>
        ),
    },
    {
        path: '/expenses',
        element: (
            <ProtectedRoute>
                <Expenses />
            </ProtectedRoute>
        ),
    },
    {
        path: '/transactions',
        element: (
            <ProtectedRoute>
                <Transactions />
            </ProtectedRoute>
        ),
    },
    { path: '/admin', element: <Admin /> },
    {
        path: '/chat',
        element: (
            <ProtectedRoute>
                <Chat />
            </ProtectedRoute>
        ),
    },
        ],
    },
]);

export default router;
