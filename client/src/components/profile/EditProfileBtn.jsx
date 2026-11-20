import React from 'react';
import { useNavigate } from 'react-router';
import { MdModeEdit } from 'react-icons/md';

const EditProfileBtn = () => {
    return (
        <button
            type="submit"
            className="w-full py-3.5 bg-yellow-500 rounded-2xl font-semibold flex items-center justify-center gap-1"
        >
            <MdModeEdit /> Edit
        </button>
    );
};

export default EditProfileBtn;
