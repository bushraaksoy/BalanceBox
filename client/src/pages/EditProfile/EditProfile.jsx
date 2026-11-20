import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import SubpageLayout from '../../layouts/SubpageLayout';
import UserAvatar from '../../components/profile/UserAvatar';
import EditProfileInput from '../../components/profile/EditProfileInput';
import EditProfileBtn from '../../components/profile/EditProfileBtn';
import {
    getUserProfile,
    updateUserProfile,
} from '../../services/profileService';
import { useNavigate } from 'react-router';
import EditProfileDate from '../../components/profile/EditProfileDate';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import SimpleLoading from '../../skeletons/SimpleLoading';

const EditProfile = () => {
    const [formData, setFormData] = useState({});
    const { userId } = useAuthContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const labels = [
        {
            key: 'fullname',
            label: 'Name',
        },
        {
            key: 'username',
            label: 'Username',
        },
        {
            key: 'email',
            label: 'Email',
        },
        {
            key: 'dob',
            label: 'Birthdate',
        },
        {
            key: 'gender',
            label: 'Gender',
        },
    ];

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: () => getUserProfile(userId),
    });

    const { mutate, isUpdateLoading } = useMutation({
        mutationFn: () => updateUserProfile(userId, formData),
        onSuccess: (data) => {
            toast.success('Profile Updated!');
            queryClient.invalidateQueries(['profile']);
            navigate('/account');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(() => ({ ...formData, [name]: value }));
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutate();
    };

    if (isUpdateLoading) {
        return <SimpleLoading />;
    }

    return (
        <SubpageLayout heading="Edit Profile">
            <div className="flex flex-col h-full gap-5">
                <div className="flex justify-between">
                    <UserAvatar name={profile?.fullname || profile?.username} />
                    {/* A bunch of edit avatar color options */}
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 h-full"
                >
                    {labels.map(({ key, label }) =>
                        key == 'dob' ? (
                            <EditProfileDate
                                key={key}
                                onChange={handleChange}
                                placeholder={new Date(
                                    profile[key]
                                ).toLocaleDateString()}
                                label={label}
                                name={key}
                            />
                        ) : (
                            <EditProfileInput
                                key={key}
                                onChange={handleChange}
                                placeholder={profile[key]}
                                label={label}
                                name={key}
                            />
                        )
                    )}
                    <EditProfileBtn />
                </form>
            </div>
        </SubpageLayout>
    );
};

export default EditProfile;
