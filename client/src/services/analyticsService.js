import axios from 'axios';

const base_url = import.meta.env.VITE_APP_API_BASE_URL;

export const getBalanceOverview = async (userId, month) => {
    try {
        const url = month
            ? `${base_url}/analytics/balance-overview?month=${month}`
            : `${base_url}/analytics/balance-overview`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        console.log('balance overview for current month: ', res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getBudgetRemainder = async (userId) => {
    try {
        const url = `${base_url}/analytics/budget-remainder`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        return res.data;
    } catch (error) {
        console.log('error getting budget remainder: ', error.message);
    }
};
export const getCurrentBalance = async (userId) => {
    try {
        const url = `${base_url}/analytics/balance`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log('error getting current balance: ', error.message);
    }
};

export const getAnalyticsTransactions = async (userId) => {
    try {
        const url = `${base_url}/analytics/transactions?period=1`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        return res.data;
    } catch (error) {
        console.log('error getting transactions for graph: ', error.message);
    }
};

export const getTransactionSummary = async (userId) => {
    try {
        console.log('Testing...');
        const url = `${base_url}/analytics/transaction-summary`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        return res.data;
    } catch (error) {
        console.log(
            'error getting transactions summary for analytics: ',
            error.message
        );
    }
};
