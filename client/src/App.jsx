import { useEffect } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Route';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { trackEvent } from './services/statsService';

const queryClient = new QueryClient();

const TrackInstall = () => {
    useEffect(() => {
        const standalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true;
        if (standalone) trackEvent('standalone_open');

        const onInstalled = () => trackEvent('app_installed');
        window.addEventListener('appinstalled', onInstalled);
        return () => window.removeEventListener('appinstalled', onInstalled);
    }, []);

    return null;
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster richColors position="top-center" />
            <TrackInstall />
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
