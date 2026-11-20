import React from 'react';
import { useNavigate } from 'react-router';
import { MdModeEdit } from 'react-icons/md';

const EditProfileBtn = () => {
    return (
        <button
            type="submit"
            className="py-3 px-5 mt-auto bg-yellow-500 rounded-3xl font-semibold flex items-center justify-center gap-1 | transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 active:bg-yellow-400"
        >
            <MdModeEdit /> Edit
        </button>
    );
};

export default EditProfileBtn;
