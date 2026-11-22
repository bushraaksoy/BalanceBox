import axios from 'axios';

const base_url = import.meta.env.VITE_APP_API_BASE_URL;

export const getAllSavings = async (userId) => {
    const url = `${base_url}/savings`;
    const res = await axios.get(url, { headers: { 'user-id': userId } });
    return res.data.savings || [];
};
