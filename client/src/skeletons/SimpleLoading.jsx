import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Loader from '../components/Loader';

const SimpleLoading = () => {
    return (
        <MainLayout>
            <Loader />
        </MainLayout>
    );
};

export default SimpleLoading;
