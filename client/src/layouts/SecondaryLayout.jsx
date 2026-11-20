import React from 'react';
import BottomNavBar from '../components/appBars/BottomNavBar';
import Heading from '../components/ui/Heading';

const SecondaryLayout = ({ children, heading }) => {
    return (
        <div className="app bg-gray-50">
            <div className="flex flex-col justify-between h-full">
                <div className="subpage-layout-content bg-white h-full overflow-y-scroll pb-36">
                    <Heading>
                        <div className="flex items-center gap-2 p-5">{heading}</div>
                    </Heading>
                    {children}
                </div>
                <BottomNavBar />
            </div>
        </div>
    );
};

export default SecondaryLayout;
