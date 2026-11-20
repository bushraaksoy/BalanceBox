import axios from 'axios';

const base_url = import.meta.env.VITE_APP_API_BASE_URL;

export async function initializeChatSession(userId) {
    try {
        const url = `${base_url}/chat/initialize-session`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log('Error initializing session', error);
        return error.message;
    }
}
export async function sendChatMessage(userId, sessionId, message) {
    try {
        const url = `${base_url}/chat/send-message`;
        const res = await axios.post(
            url,
            { sessionId, message },
            { headers: { 'user-id': userId } }
        );
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log('Error sending message', error);
        return error.message;
    }
}

export async function getSessionMessages(userId, sessionId) {
    try {
        const url = `${base_url}/chat/session-messages/${sessionId}`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        console.log('Chat session messages: ', res.data);
        return res.data;
    } catch (error) {
        console.log('Error getting chat session messages: ', error);
        return error.message;
    }
}

export async function getFinancialInsight(userId, sessionId) {
    try {
        console.log(sessionId);
        const url = `${base_url}/chat/insights?sessionId=${sessionId}`;
        const res = await axios.get(url, { headers: { 'user-id': userId } });
        console.log('Chat insights: ', res.data);
        return res.data;
    } catch (error) {
        console.log('Error getting financial insight: ', error);
        return error.message;
    }
}
