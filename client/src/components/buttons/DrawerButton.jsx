import React from 'react';

const DrawerButton = ({ title }) => {
    return (
        <button
            className="p-3 rounded-3xl bg-yellow-500 font-bold mt-6"
            type="submit"
        >
            {title}
        </button>
    );
};

export default DrawerButton;
