import React from 'react';
import BottomNavBar from '../components/appBars/BottomNavBar';
import Heading from '../components/ui/Heading';
import useStatusBar from '../hooks/useStatusBar';

const SecondaryLayout = ({ children, heading, contentClassName = 'bg-white' }) => {
    useStatusBar(contentClassName.includes('F8F9FB') ? 'page' : 'bar');
    return (
        <div className="app bg-gray-50">
            <div className="relative flex h-full min-h-0 flex-col">
                <header className={`shrink-0 ${contentClassName}`}>
                    <Heading>
                        <div className="flex items-center gap-2 px-5">{heading}</div>
                    </Heading>
                </header>
                <div
                    className={`subpage-layout-content min-h-0 flex-1 overflow-y-auto overscroll-none pb-28 ${contentClassName}`}
                >
                    {children}
                </div>
                <BottomNavBar />
            </div>
        </div>
    );
};

export default SecondaryLayout;
