import axios from 'axios';

const base_url = import.meta.env.VITE_APP_API_BASE_URL;

const headers = (userId) => ({ 'user-id': userId });

export const getAdminOverview = async (userId) => {
    const res = await axios.get(`${base_url}/admin/overview`, {
        headers: headers(userId),
    });
    return res.data;
};

export const getAdminUsers = async (userId) => {
    const res = await axios.get(`${base_url}/admin/users`, {
        headers: headers(userId),
    });
    return res.data;
};
