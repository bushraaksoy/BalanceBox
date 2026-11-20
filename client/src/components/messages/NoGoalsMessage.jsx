import React from 'react';
import { FaPiggyBank } from 'react-icons/fa6';
import { FiPlusCircle } from 'react-icons/fi';
import { PiPiggyBankFill } from 'react-icons/pi';

const NoGoalsMessage = () => {
    return (
        <div className="flex flex-col gap-3 items-center pt-15 pb-20">
            <FaPiggyBank color="salmon" size={34} />
            <h1 className="text-lg font-medium">No Saving Goals Yet</h1>
            <div className="text-gray-500 text-center">
                <p className="">You don't have any saving goals</p>
                <p className="">
                    Click on the
                    <FiPlusCircle className="inline mx-2" size={22} />
                    icon to add a new saving goal
                </p>
            </div>
        </div>
    );
};

export default NoGoalsMessage;
