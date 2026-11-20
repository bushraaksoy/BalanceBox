import React from 'react';
import NavIcon from '../NavIcon';
import { useNavigate } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa6';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <NavIcon onClick={() => navigate(-1)}>
            <FaArrowLeft size={20} />
        </NavIcon>
    );
};

export default BackButton;
