import axios from 'axios';

const base_url = import.meta.env.VITE_APP_API_BASE_URL;

export const getAllIncomes = async (userId) => {
    try {
        const url = `${base_url}/incomes`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addIncome = async (userId, data) => {
    try {
        const url = `${base_url}/incomes`;
        const res = await axios.post(url, data, {
            headers: { 'user-id': userId },
        });
        console.log(res.data);
    } catch (error) {
        console.log('error adding income: ', error.message);
    }
};

export const editIncome = async (userId, incomeId, data) => {
    try {
        const url = `${base_url}/incomes/${incomeId}`;
        const res = await axios.put(url, data, {
            headers: { 'user-id': userId },
        });
        console.log(res.data);
    } catch (error) {
        console.log('error editing income: ', error.message);
    }
};

export const deleteIncome = async (userId, incomeId) => {
    try {
        const url = `${base_url}/incomes/${incomeId}`;
        const res = await axios.delete(url, {
            headers: { 'user-id': userId },
        });
        console.log(res.data);
    } catch (error) {
        console.log('error deleting income: ', error.message);
    }
};

export const getPendingIncomes = async (userId) => {
    try {
        const url = `${base_url}/incomes/pending`;
        const res = await axios.get(url, {
            headers: { 'user-id': userId },
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log('error getting pending incomes: ', error.message);
    }
};
