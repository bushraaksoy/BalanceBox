import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AuthProvider from './context/AuthContext.jsx';
import PreferencesProvider from './context/PreferencesContext.jsx';

const blockPinchZoom = (event) => event.preventDefault();
document.addEventListener('gesturestart', blockPinchZoom, { passive: false });
document.addEventListener('gesturechange', blockPinchZoom, { passive: false });

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <PreferencesProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </PreferencesProvider>
    </StrictMode>
);
