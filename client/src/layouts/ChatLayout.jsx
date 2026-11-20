import React from 'react';
import SubpageAppBar from '../components/appBars/SubpageAppBar';

const ChatLayout = ({ children, heading }) => {
    return (
        <div className="app bg-gray-50">
            <div className="h-full">
                <SubpageAppBar title={heading} />
                <div
                    className={`chatbot-layout-content px-2 pt-13 pb-22 flex flex-col justify-between bg-gray-100 h-full bg-[url('/chat-wallpaper.png')] bg-no-repeat bg-center bg-cover bg-fixed `}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ChatLayout;
