import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import SubpageLayout from '../layouts/SubpageLayout';
import UserAvatar from '../components/profile/UserAvatar';
import EditProfileInput from '../components/profile/EditProfileInput';
import EditProfileBtn from '../components/profile/EditProfileBtn';
import {
    getUserProfile,
    updateUserProfile,
} from '../services/profileService';
import { useNavigate } from 'react-router';
import EditProfileDate from '../components/profile/EditProfileDate';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import SimpleLoading from '../skeletons/SimpleLoading';

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
        return (
            <div className="app bg-gray-50">
                <SimpleLoading />
            </div>
        );
    }

    const name = profile?.fullname || profile?.username;

    return (
        <SubpageLayout heading="Edit Profile">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-gray-200">
                    <UserAvatar name={name} size="sm" />
                    <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">{name}</span>
                        {profile?.fullname && profile?.username && (
                            <span className="text-sm text-gray-500 truncate">
                                {profile.username}
                            </span>
                        )}
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="bg-white rounded-2xl px-4 border border-gray-200 divide-y divide-gray-100">
                        {labels.map(({ key, label }) =>
                            key == 'dob' ? (
                                <EditProfileDate
                                    key={key}
                                    onChange={handleChange}
                                    placeholder={
                                        profile?.[key]
                                            ? new Date(
                                                  profile[key]
                                              ).toLocaleDateString()
                                            : ''
                                    }
                                    label={label}
                                    name={key}
                                />
                            ) : (
                                <EditProfileInput
                                    key={key}
                                    onChange={handleChange}
                                    placeholder={profile?.[key]}
                                    label={label}
                                    name={key}
                                />
                            )
                        )}
                    </div>
                    <EditProfileBtn />
                </form>
            </div>
        </SubpageLayout>
    );
};

export default EditProfile;
