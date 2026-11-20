import React from 'react';
import Currency from '../Currency';
import Amount from '../ui/Amount';

const Card = ({ title, balance }) => {
    return (
        <div className="w-40 h-30 bg-gradient-to-br from-yellow-200 to-yellow-500 flex-shrink-0 font-semibold flex flex-col  justify-between px-4 py-5 rounded-2xl text-stone-800 shadow-md">
            <h1 className=" font-medium text-sm text-right">{title}</h1>
            <div className="text-start">
                <p className="text-xs font-light font-gray-700">Balance</p>
                <div className="text-gray-500 font-medium text-lg">
                    <Currency />
                    <Amount amount={balance} />
                </div>
            </div>
        </div>
    );
};

export default Card;

// const Card = ({ title, balance }) => {
//     return (
//         <div className="w-56 h-34 flex-shrink-0 p-4 py-6 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-2xl flex flex-col justify-between text-stone-800 shadow-md">
//             <h1 className="text-gray-800 font-medium">{title}</h1>
//             <div className="text-3xl font-medium text-stone-700">
//                 <Currency/> {balance}
//             </div>
//         </div>
//     );
// };
