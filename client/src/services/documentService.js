export const uploadBankstatement = async (userId, data) => {
    try {
        const url = `${base_url}/document/bankstatement?bank=${data.bank}`;
        const res = await axios.post(url, data, {
            headers: {
                'user-id': userId,
            },
        });
        return res.data;
    } catch (error) {
        console.log('error uploading bankstatement: ', error.message);
    }
};

export const confirmBankStatementTransactions = async (userId, data) => {
    try {
        console.log(userId);
        const url = `${base_url}/document/confirmBankstatement`;
        console.log(url);
        const res = await axios.post(url, data, {
            headers: {
                'user-id': userId,
            },
        });
        return res.data;
    } catch (error) {
        console.log('error confirming bankstatement: ', error.message);
    }
};
