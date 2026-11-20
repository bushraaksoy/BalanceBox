import React, { useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import AuthInput from '../components/auth/AuthInput';
import AuthButton from '../components/auth/AuthButton';
import { login } from '../services/authService';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import SimpleLoading from '../skeletons/SimpleLoading';

const Login = () => {
    const [formData, setFormData] = useState({});
    const [error, setErrors] = useState('');
    const { setUserId } = useAuthContext();
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation({
        mutationFn: () => login(formData.username, formData.password),
        onSuccess: (data) => {
            console.log('success');
            console.log(data);
            setUserId(data.userId);
            toast.success('Logged in successfully!');
            navigate('/');
        },
        onError: (error) => {
            console.error('Error logging in', error);
            setErrors(error.message);
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('login clicked');
        mutate();
    };
    if (isLoading) {
        return (
            <div className="app bg-gray-50">
                <SimpleLoading />
            </div>
        );
    }
    return (
        <AuthLayout
            title="Welcome to Balance Box!"
            subtitle="Keep your savings in check"
            linkMessage="Don't have an account?"
            linkText="Register!"
            linkTo="/register"
        >
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 width-full"
            >
                <AuthInput
                    name="username"
                    type="text"
                    value={formData.username || ''}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <AuthInput
                    name="password"
                    type="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                    placeholder="Password"
                    error={error}
                />

                <AuthButton>LOGIN</AuthButton>
            </form>
        </AuthLayout>
    );
};

export default Login;
