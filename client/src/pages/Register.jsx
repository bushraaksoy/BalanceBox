import React, { useState } from 'react';
import { validateForm } from '../utils/authFormValidation';
import AuthInput from '../components/auth/AuthInput';
import AuthButton from '../components/auth/AuthButton';
import { register } from '../services/authService';
import { useNavigate } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import { toast } from 'sonner';

const Register = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({
            username: '',
            password: '',
            confirmPassword: '',
        });
        const errors = validateForm(formData);
        setErrors(errors);
        if (!errors) {
            try {
                const data = await register(
                    formData.username,
                    formData.password
                );
                toast.success('Registered successfully!');
                console.log(data.message);
                navigate('/login');
            } catch (error) {
                console.log(error);
                setErrors({ ...errors, username: error.message });
            }
        }
    };
    return (
        <AuthLayout
            title="Register with Balance Box!"
            subtitle="Keep your savings in check"
            linkMessage="Already have an account? "
            linkText="Login!"
            linkTo="/login"
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
                    error={errors.username}
                />
                <AuthInput
                    name="password"
                    type="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                    placeholder="Password"
                    error={errors.password}
                />
                <AuthInput
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword || ''}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    error={errors.confirmPassword}
                />
                <AuthButton>REGISTER</AuthButton>
            </form>
        </AuthLayout>
    );
};

export default Register;
