import React from 'react';
import SaveButton from './SaveButton';
import DeleteButton from './DeleteButton';

const DrawerButtons = ({ handleEdit, handleDelete }) => {
    return (
        <div className="py-2 flex gap-2 ">
            <SaveButton onClick={handleEdit} />
            <DeleteButton onClick={handleDelete} />
        </div>
    );
};

export default DrawerButtons;
