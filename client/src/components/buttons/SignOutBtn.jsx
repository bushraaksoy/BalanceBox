import React from 'react';
import { PiSignOutBold } from 'react-icons/pi';
import { signout } from '../../services/authService';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

const SignOutBtn = () => {
    const navigate = useNavigate();
    const { setUserId } = useAuthContext();
    const queryClient = useQueryClient();
    const handleClick = () => {
        signout(navigate, setUserId);
        toast.success('Signed out!');
        queryClient.clear();
    };
    return (
        <button
            onClick={handleClick}
            className="font-medium  flex items-center gap-2 p-2"
            // className="py-3 px-5 bg-yellow-500 rounded-3xl font-semibold flex items-center justify-center gap-1 | transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 active:bg-yellow-400"
        >
            <PiSignOutBold /> Sign Out
        </button>
    );
};

export default SignOutBtn;
