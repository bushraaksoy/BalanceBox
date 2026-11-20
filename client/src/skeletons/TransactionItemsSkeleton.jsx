import React from 'react';

const TransactionItemsSkeleton = () => {
    return (
        <div>
            <h1 className="font-semibold text-stone-800 py-6 "></h1>
            <ul className="flex flex-col gap-3 scroll-">
                <li className="p-10 glow rounded-xl "></li>
                <li className="p-10 glow rounded-xl "></li>
                <li className="p-10 glow rounded-xl "></li>
                <li className="p-10 glow rounded-xl "></li>
                <li className="p-10 glow rounded-xl "></li>
                <li className="p-10 glow rounded-xl "></li>
                <li className="p-10 glow rounded-xl "></li>
                <li className="p-10 glow rounded-xl "></li>
                <li className="p-10 glow rounded-xl "></li>
                <li className="p-10 glow rounded-xl "></li>
                <li className="p-10 glow rounded-xl "></li>
            </ul>
        </div>
    );
};

export default TransactionItemsSkeleton;
