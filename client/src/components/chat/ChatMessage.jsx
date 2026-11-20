import React from 'react';
import botIcon from '/bot-img2.png';
import userIcon from '/user-img.png';
import ReactMarkdown from 'react-markdown';
import { VscRobot } from 'react-icons/vsc';
import { FaRegUser, FaUser, FaUserAlt } from 'react-icons/fa';

const ChatMessage = ({ message, role }) => {
    return role === 'user' ? (
        <div className="flex gap-2 items-end justify-end">
            <div className=" max-w-[75%] text-sm bg-gray-100  rounded-t-2xl rounded-bl-2xl p-3 shadow markdown-container">
                <ReactMarkdown>{message}</ReactMarkdown>
            </div>

            <FaUser
                size={28}
                className="text-purple-700 p-1 rounded-bl-full rounded-t-full bg-gray-100 border border-gray-300"
            />
        </div>
    ) : (
        <div className="flex gap-2 items-end justify-start">
            <img
                src={botIcon}
                width={35}
                className="p-1 rounded-br-full rounded-t-full bg-gray-100 border border-gray-300"
            />
            <div className=" text-sm max-w-[80%] bg-gray-100 p-3 rounded-t-2xl rounded-br-2xl shadow markdown-container">
                <ReactMarkdown>{message}</ReactMarkdown>
            </div>
        </div>
    );
};

export default ChatMessage;
