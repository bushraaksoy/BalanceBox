import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    getSessionMessages,
    initializeChatSession,
    sendChatMessage,
} from '../services/chatbotService';
import { TbMessageChatbot } from 'react-icons/tb';
import { useAuthContext } from '../context/AuthContext';
import ChatLayout from '../layouts/ChatLayout';
import { IoSend } from 'react-icons/io5';
import ChatMessage from '../components/chat/ChatMessage';

export default function Chat() {
    // fetch user sessions
    // if user has session:
    // > store sessionId
    // > fetch session messages
    // > display them and so on
    // else:
    // > initialize session
    // store sessionId
    // send and display

    const { userId } = useAuthContext();
    const [input, setInput] = useState('');
    const [sessionId, setSessionId] = useState(null);
    // const [sessionId, setSessionId] = useState('cmc7gq38b000147dgve2zg5be');
    const [chat, setChat] = useState([]);

    const queryClient = useQueryClient();

    const { data: messages, isLoading } = useQuery({
        queryKey: ['messages', sessionId],
        queryFn: () => getSessionMessages(userId, sessionId),
    });

    const mutation = useMutation({
        mutationFn: async ({ userId, sessionId, message }) => {
            if (!sessionId) {
                const newSession = await initializeChatSession(userId);
                sessionId = newSession.sessionId;
                console.log(newSession);
            }
            return await sendChatMessage(userId, sessionId, message);
        },
        onSuccess: (data) => {
            setSessionId(data.sessionId);
            setChat((prev) => [
                ...prev,
                { role: 'assistant', content: data.content },
            ]);
            setInput('');
        },
    });

    useEffect(() => {
        if (messages) setChat(messages);
    }, [messages]);

    const bottomRef = useRef();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    const handleSend = () => {
        if (!input.trim()) return;
        setChat([...chat, { role: 'user', content: input }]);
        mutation.mutate({ userId, sessionId, message: input });
    };

    return (
        <ChatLayout
            heading={
                <div className="flex items-center gap-1">
                    <TbMessageChatbot size={22} /> Chat with your Assistant!
                </div>
            }
        >
            <div className=" flex flex-col h-full w-full">
                <div className="h-full py-4 overflow-scroll flex flex-col gap-3">
                    {chat?.map((msg, inx) => (
                        <ChatMessage
                            role={msg.role}
                            key={inx}
                            message={msg.content}
                        />
                    ))}
                    <div ref={bottomRef} />
                </div>
                <div className="flex gap-1 text-sm w-full chat-input p-4 pb-8 mt-auto fixed bottom-0  bg-gray-50/90 border-t-gray-200 border-t ">
                    <input
                        className=" p-2 px-4 w-full outline-none border bg-white border-gray-300 rounded-3xl "
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Are my finances on track?"
                    />
                    <button
                        className={` ${
                            input.length > 0 ? 'bg-black' : 'bg-black/40'
                        } text-white rounded-full p-3`}
                        onClick={handleSend}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? '...' : <IoSend />}
                    </button>
                </div>
            </div>
        </ChatLayout>
    );
}
