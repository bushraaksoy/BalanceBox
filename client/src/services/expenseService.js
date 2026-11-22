import axios from 'axios';

const base_url = import.meta.env.VITE_APP_API_BASE_URL;

export const getExpenseCategory = async (userId, month) => {
    try {
        const url = month
            ? `${base_url}/expenses?month=${month}`
            : `${base_url}/expenses`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(`Error getting expense category: ${error.message}`);
    }
};

export const getUserExpenses = async (userId) => {
    try {
        const url = `${base_url}/expenses`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        return res.data;
    } catch (error) {
        console.log(`Error getting expenses: ${error.message}`);
    }
};

export const addExpense = async (userId, data) => {
    try {
        const url = `${base_url}/expenses`;
        const res = await axios.post(url, data, {
            headers: { 'user-id': userId },
        });
        return res.data;
    } catch (error) {
        console.log('Error adding expense: ', error.message);
    }
};
export const editExpense = async (userId, expenseId, data) => {
    const url = `${base_url}/expenses/${expenseId}`;
    try {
        const res = await axios.put(url, data, {
            headers: { 'user-id': userId },
        });
        return res.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Could not update this expense'
        );
    }
};

export const deleteExpense = async (userId, expenseId) => {
    try {
        const url = `${base_url}/expenses/${expenseId}`;
        const res = await axios.delete(url, {
            headers: { 'user-id': userId },
        });
        return res.data;
    } catch (error) {
        console.log('Error adding expense: ', error.message);
    }
};
