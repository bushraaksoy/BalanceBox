import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Route';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster richColors position="top-center" />
            <div className="app bg-gray-50">
                <RouterProvider router={router} />
            </div>
        </QueryClientProvider>
    );
}

export default App;
