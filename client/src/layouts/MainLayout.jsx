import React from 'react';
import BottomNavBar from '../components/appBars/BottomNavBar';
import TopAppBar from '../components/appBars/TopAppBar';

const MainLayout = ({ children }) => {
    return (
        <div className="app bg-gray-50">
            <div className="relative flex h-full min-h-0 flex-col">
                <TopAppBar />
                <div className="main-layout-content min-h-0 flex-1 overflow-y-auto overscroll-none bg-gray-50 px-4 pt-4 pb-28">
                    {children}
                </div>
                <BottomNavBar />
            </div>
        </div>
    );
};

export default MainLayout;
