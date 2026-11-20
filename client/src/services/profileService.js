import axios from 'axios';

const base_url = import.meta.env.VITE_APP_API_BASE_URL;

export const getUserProfile = async (userId) => {
    const url = `${base_url}/profile`;
    const res = await axios.get(url, {
        headers: {
            'user-id': userId,
            // 'Authorization': `Bearer ${token}`,
        },
    });
    return res.data;
};

export const updateUserProfile = async (userId, data) => {
    console.log('updating user profile inside services');
    const url = `${base_url}/profile`;
    const res = await axios.put(url, data, { headers: { 'user-id': userId } });
    return res.data;
};
