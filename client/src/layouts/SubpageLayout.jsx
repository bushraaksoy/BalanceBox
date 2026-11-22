import React from 'react';
import SubpageAppBar from '../components/appBars/SubpageAppBar';
import useStatusBar from '../hooks/useStatusBar';

const SubpageLayout = ({ children, heading }) => {
    useStatusBar('surface');
    return (
        <div className="app bg-[#F8F9FB]">
            <div className="flex h-full min-h-0 flex-col">
                <SubpageAppBar title={heading} />
                <div className="subpage-layout-content min-h-0 flex-1 overflow-y-auto overscroll-none bg-[#F8F9FB] p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SubpageLayout;
