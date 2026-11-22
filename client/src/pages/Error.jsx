import { useRouteError, useNavigate } from 'react-router-dom';
import useStatusBar from '../hooks/useStatusBar';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    useStatusBar('page');
    console.error(error);

    return (
        <div className="app flex flex-col items-center justify-center bg-[#F8F9FB] px-8 text-center text-[#171717]">
            <p className="text-lg font-semibold">Something went wrong</p>
            <p className="mt-2 max-w-xs text-sm text-[#737987]">
                This screen didn't load. You can try again, or go back home.
            </p>
            <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 w-full max-w-xs rounded-full bg-[#E6B33D] py-3 text-sm font-medium text-[#171717]"
            >
                Try again
            </button>
            <button
                type="button"
                onClick={() => navigate('/')}
                className="mt-3 text-sm font-medium text-[#737987]"
            >
                Back home
            </button>
        </div>
    );
};

export default ErrorPage;
