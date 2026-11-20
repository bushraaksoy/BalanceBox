import React from 'react';
import { FcSalesPerformance } from 'react-icons/fc';
import { MdAddchart } from 'react-icons/md';
import { RiProgress6Line } from 'react-icons/ri';

const NoActivityMessage = () => {
    return (
        <div className="flex flex-col gap-3 items-center py-15">
            <FcSalesPerformance size={35} />
            <h1 className="text-lg font-medium">No Activity Yet</h1>
            <div className="text-gray-500 text-center">
                <p className="">You have not budgeted your expenses yet</p>
                <p className="">
                    Go to the{' '}
                    <span className="font-medium text-gray-600">Budgeting</span>{' '}
                    page to budget your monthly expenses
                </p>
            </div>
            <div className="py-7 my-6 w-full flex flex-col items-center gap-3 border border-gray-500 rounded-lg">
                <div className="flex gap-3 items-center">
                    <RiProgress6Line size={25} color="gray" />
                    <h1 className="text-gray-700">
                        View your spending progress
                    </h1>
                </div>

                <div className="flex gap-3 items-center">
                    {/* <MdLibraryBooks size={25} color="gray" /> */}
                    <MdAddchart size={25} color="gray" />

                    <h1 className="text-gray-700">
                        Record your latest spendings
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default NoActivityMessage;
