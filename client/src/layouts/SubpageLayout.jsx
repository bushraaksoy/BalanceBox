import React from 'react';
import SubpageAppBar from '../components/appBars/SubpageAppBar';

const SubpageLayout = ({ children, heading }) => {
    return (
        <div className="app bg-gray-50">
            <div className="flex h-full min-h-0 flex-col">
                <SubpageAppBar title={heading} />
                <div className="subpage-layout-content min-h-0 flex-1 overflow-y-auto overscroll-none bg-gray-50 p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SubpageLayout;
