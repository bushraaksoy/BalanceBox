import axios from 'axios';

const base_url = import.meta.env.VITE_APP_API_BASE_URL;

export const getAllTransactions = async (userId) => {
    try {
        const url = `${base_url}/transactions`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTransactionHistory = async (userId) => {
    try {
        const url = `${base_url}/transactions?period=month`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addUserTransaction = async (userId, type, data) => {
    try {
        const url = `${base_url}/transactions?type=${type}`;
        const res = await axios.post(url, data, {
            headers: { 'user-id': userId },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addExpenseTransaction = async (userId, data) => {
    try {
        console.log(data, userId);
        const url = `${base_url}/transactions/expense`;
        const res = await axios.post(url, data, {
            headers: { 'user-id': userId },
        });
        return res.data;
    } catch (error) {
        console.log('error adding expense transaction: ', error);
    }
};

export const addSavingsTransaction = async (userId, data) => {
    try {
        const url = `${base_url}/transactions/saving`;
        const res = await axios.post(url, data, {
            headers: { 'user-id': userId },
        });
        return res.data;
    } catch (error) {
        console.log('error adding expense transaction: ', error);
    }
};

export const addIncomeTransaction = async (userId, data) => {
    try {
        const url = `${base_url}/transactions/income`; // incomeId, cardId, amount
        const res = await axios.post(url, data, {
            headers: { 'user-id': userId },
        });
        return res.data;
    } catch (error) {
        console.log('error adding income transaction: ', error);
    }
};
