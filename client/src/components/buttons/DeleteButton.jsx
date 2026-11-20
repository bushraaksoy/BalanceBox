import React from 'react';
import { IoTrashOutline } from 'react-icons/io5';

const DeleteButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="p-2 w-full rounded-3xl text-red-400 border-red-40 border font-medium flex items-center justify-center gap-1"
        >
            <IoTrashOutline />
            Delete
        </button>
    );
};

export default DeleteButton;
