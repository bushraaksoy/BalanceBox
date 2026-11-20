import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import Loader from '../components/Loader';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { userId } = useAuthContext();

    useEffect(() => {
        console.log('checking userId');
        if (userId == 'null' || !userId) {
            console.log('user is null');
            navigate('/login');
        }
    }, [userId]);

    return children;
};

export default ProtectedRoute;
