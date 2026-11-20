import React from 'react';
import { FaPiggyBank } from 'react-icons/fa6';
import { FiPlusCircle } from 'react-icons/fi';
import { PiPiggyBankFill } from 'react-icons/pi';

const NoGoalsMessage = () => {
    return (
        <div className="flex flex-col gap-2 items-center py-6">
            <FaPiggyBank color="salmon" size={26} />
            <h1 className="text-base font-medium">No Saving Goals Yet</h1>
            <div className="text-gray-500 text-center">
                <p className="">You don't have any saving goals</p>
                <p className="">
                    Click on the
                    <FiPlusCircle className="inline mx-1.5" size={16} />
                    icon to add a new saving goal
                </p>
            </div>
        </div>
    );
};

export default NoGoalsMessage;
