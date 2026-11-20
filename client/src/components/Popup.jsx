import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const Popup = ({ visible, setVisible, children }) => {
    return (
        visible && (
            <div className="popop-container w-screen h-screen z-10 bg-black/30 flex items-center justify-center fixed top-0 right-0">
                <div className="w-80 rounded-3xl bg-white p-7 flex flex-col items-center justify-between gap-4 relative">
                    <IoClose
                        onClick={(e) => {
                            e.stopPropagation();
                            setVisible(false);
                        }}
                        className="absolute right-4 top-4"
                        size={25}
                    />
                    {children}
                </div>
            </div>
        )
    );
};

export default Popup;
