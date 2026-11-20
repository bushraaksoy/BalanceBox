import React from 'react';
import { IoIosSave } from 'react-icons/io';

const SaveButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="border w-full border-gray-700 bg-gray-50 p-2 rounded-3xl font-medium flex items-center justify-center gap-1"
        >
            <IoIosSave />
            Save
        </button>
    );
};

export default SaveButton;
