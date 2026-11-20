import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Savings from '../pages/Savings/Savings';
import Login from '../pages/Login/Login';
import Analytics from '../pages/Analytics/Analytics';
import Profile from '../pages/Profile/Profile';
import Register from '../pages/Register/Register';
import ProtectedRoute from './ProtectedRoute';
import BudgetPlanner from '../pages/BudgetPlanner/BudgetPlanner';
import Notifications from '../pages/Notifications/Notifications';
import EditProfile from '../pages/EditProfile/EditProfile';
import Activity from '../pages/Activity/Activity';
import Incomes from '../pages/Incomes/Incomes';
import Expenses from '../pages/Expenses/Expenses';
import Transactions from '../pages/Transactions/Transactions';
import Chat from '../pages/Chat/Chat';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
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
    {
        path: '/chat',
        element: (
            <ProtectedRoute>
                <Chat />
            </ProtectedRoute>
        ),
    },
]);

export default router;
