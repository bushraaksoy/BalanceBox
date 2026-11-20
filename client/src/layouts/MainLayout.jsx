import React from 'react';
import BottomNavBar from '../components/appBars/BottomNavBar';
import TopAppBar from '../components/appBars/TopAppBar';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col justify-between h-screen">
            <TopAppBar />
            <div className="main-layout-content p-4 bg-gray-50 h-full overflow-y-scroll mt-14 pb-36">
                {children}
            </div>
            <BottomNavBar />
        </div>
    );
};

export default MainLayout;
