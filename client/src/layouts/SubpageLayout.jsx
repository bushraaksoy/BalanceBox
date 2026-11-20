import React from 'react';
import SubpageAppBar from '../components/appBars/SubpageAppBar';

const SubpageLayout = ({ children, heading }) => {
    return (
        <div className="flex flex-col justify-between h-screen">
            <SubpageAppBar title={heading} />
            <div
                className={`subpage-layout-content p-4 bg-gray-50 h-full overflow-y-scroll mt-14 pb-20`}
            >
                {children}
            </div>
            {/* No bottom nav bar */}
        </div>
    );
};

export default SubpageLayout;
