import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const Popup = ({ visible, setVisible, children }) => {
    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4"
            onClick={(event) => {
                event.stopPropagation();
                setVisible(false);
            }}
        >
            <div
                className="w-full max-w-80 rounded-3xl bg-white p-7 flex flex-col items-center justify-between gap-4 relative"
                onClick={(event) => event.stopPropagation()}
            >
                <IoClose
                    onClick={(event) => {
                        event.stopPropagation();
                        setVisible(false);
                    }}
                    className="absolute right-4 top-4"
                    size={25}
                />
                {children}
            </div>
        </div>
    );
};

export default Popup;
