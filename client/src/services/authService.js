import axios from 'axios';

const base_url = import.meta.env.VITE_APP_API_BASE_URL;

export const login = async (username, password) => {
    console.log('login attempt from client side');
    const url = `${base_url}/auth/login`;
    try {
        const res = await axios.post(url, { username, password });
        return res.data;
    } catch (error) {
        console.log(error);
        if (error.status == 401) {
            throw new Error(error.response.data.message);
        }
        return error.response.data.message;
    }
};

export const register = async (username, password) => {
    const url = `${base_url}/auth/register`;
    try {
        const res = await axios.post(url, { username, password });
        return res.data;
    } catch (error) {
        if (error.response.status == 409) {
            console.log(error.response.data.message);
            throw new Error('A User with that username already exists');
        }
        throw new Error('An error occured');
    }
};

export const signout = (navigate, setUserId) => {
    setUserId(null);
    console.log('Signout done?');
    navigate('/login');
};
