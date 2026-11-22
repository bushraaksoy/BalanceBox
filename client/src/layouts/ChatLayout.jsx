import React from 'react';
import SubpageAppBar from '../components/appBars/SubpageAppBar';
import chatBg from '../assets/images/chatbg.png';
import useStatusBar from '../hooks/useStatusBar';

const ChatLayout = ({ children, heading }) => {
    useStatusBar('bar');
    return (
        <div className="app bg-gray-50">
            <div className="flex h-full min-h-0 flex-col">
                <SubpageAppBar title={heading} />
                <div className="chatbot-layout-content relative min-h-0 flex-1 overflow-hidden bg-gray-100 px-2">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-no-repeat bg-center bg-cover opacity-40"
                        style={{ backgroundImage: `url(${chatBg})` }}
                    />
                    <div className="relative h-full">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default ChatLayout;
