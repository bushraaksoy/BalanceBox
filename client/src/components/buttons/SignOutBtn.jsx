import React from 'react';
import { signout } from '../../services/authService';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

const SignOutBtn = () => {
    const navigate = useNavigate();
    const { setUserId, setIsAdmin } = useAuthContext();
    const queryClient = useQueryClient();
    const handleClick = () => {
        signout(navigate, setUserId, setIsAdmin);
        toast.success('Signed out!');
        queryClient.clear();
    };
    return (
        <button
            onClick={handleClick}
            className="w-full bg-white rounded-2xl border border-gray-200 py-3.5 text-red-500 font-medium"
        >
            Sign out
        </button>
    );
};

export default SignOutBtn;
