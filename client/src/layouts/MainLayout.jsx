import React from 'react';
import BottomNavBar from '../components/appBars/BottomNavBar';
import TopAppBar from '../components/appBars/TopAppBar';
import useStatusBar from '../hooks/useStatusBar';

const MainLayout = ({ children }) => {
    useStatusBar('surface');
    return (
        <div className="app bg-[#F8F9FB]">
            <div className="relative flex h-full min-h-0 flex-col">
                <TopAppBar />
                <div className="main-layout-content min-h-0 flex-1 overflow-y-auto overscroll-none bg-[#F8F9FB] px-4 pt-4 pb-28">
                    {children}
                </div>
                <BottomNavBar />
            </div>
        </div>
    );
};

export default MainLayout;
