import axios from 'axios';

const base_url = import.meta.env.VITE_APP_API_BASE_URL;

export const getCards = async (userId) => {
    try {
        const url = `${base_url}/cards`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log('Error: ', error);
    }
};

export const getCardsDetails = async (userId) => {
    try {
        const url = `${base_url}/cards/details`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log('Error: ', error);
    }
};
export const getCard = async (userId, cardId) => {
    try {
        const url = `${base_url}/cards/${cardId}`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        return res.data;
    } catch (error) {
        console.log('Error: ', error);
    }
};
export const addCard = async (userId, data) => {
    try {
        const url = `${base_url}/cards`;
        const res = await axios.post(url, data, {
            headers: { 'user-id': userId },
        });
        return res.data;
    } catch (error) {
        console.log('Error: ', error);
    }
};
export const editCard = async (userId, cardId, data) => {
    try {
        const url = `${base_url}/cards/${cardId}`;
        const res = await axios.put(url, data, {
            headers: { 'user-id': userId },
        });
        return res.data;
    } catch (error) {
        console.log('Error: ', error);
    }
};
export const deleteCard = async (userId, cardId) => {
    try {
        const url = `${base_url}/cards/${cardId}`;
        const res = await axios.delete(url, { headers: { 'user-id': userId } });
        return res.data;
    } catch (error) {
        console.log('Error: ', error);
    }
};
