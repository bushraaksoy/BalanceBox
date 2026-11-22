import { BiSolidShoppingBags } from 'react-icons/bi';
import { FaShoppingBasket } from 'react-icons/fa';
import { FaCalendarCheck, FaHeartPulse, FaShieldHalved } from 'react-icons/fa6';
import { GiClapperboard, GiHouse } from 'react-icons/gi';
import { IoFastFood } from 'react-icons/io5';
import { MdEmojiTransportation } from 'react-icons/md';
import { TbCategoryFilled } from 'react-icons/tb';
import { FiUserCheck } from 'react-icons/fi';

import {
    MdPerson,
    MdAlternateEmail,
    MdEmail,
    MdCalendarToday,
} from 'react-icons/md';

export const expenseCategoryIcons = {
    HOUSING: <GiHouse size={20} />,
    TRANSPORT: <MdEmojiTransportation size={20} />,
    HEALTH: <FaHeartPulse size={20} />,
    GROCERIES: <FaShoppingBasket size={20} />,
    FOOD: <IoFastFood size={20} />,
    SHOPPING: <BiSolidShoppingBags size={20} />,
    INSURANCE: <FaShieldHalved size={20} />,
    ENTERTAINMENT: <GiClapperboard size={20} />,
    SUBSCRIPTION: <FaCalendarCheck size={20} />,
    OTHER: <TbCategoryFilled size={20} />,
};

export const expenseCategoryColors = {
    HOUSING: { bg: 'rgba(196, 123, 69, 0.16)', color: '#C47B45' },
    TRANSPORT: { bg: 'rgba(37, 99, 235, 0.14)', color: '#2563EB' },
    HEALTH: { bg: 'rgba(219, 39, 119, 0.14)', color: '#DB2777' },
    GROCERIES: { bg: 'rgba(22, 163, 74, 0.14)', color: '#16A34A' },
    FOOD: { bg: 'rgba(234, 88, 12, 0.14)', color: '#EA580C' },
    SHOPPING: { bg: 'rgba(124, 58, 237, 0.14)', color: '#7C3AED' },
    INSURANCE: { bg: 'rgba(13, 148, 136, 0.14)', color: '#0D9488' },
    ENTERTAINMENT: { bg: 'rgba(192, 38, 211, 0.14)', color: '#C026D3' },
    SUBSCRIPTION: { bg: 'rgba(79, 70, 229, 0.14)', color: '#4F46E5' },
    OTHER: { bg: 'rgba(180, 130, 20, 0.16)', color: '#A16207' },
};

export const profileIcons = [
    {
        key: 'fullname',
        label: 'Name',
        icon: <MdPerson className="text-gray-600" size={20} />,
    },
    {
        key: 'username',
        label: 'Username',
        icon: <MdAlternateEmail className="text-gray-600" size={20} />,
    },
    {
        key: 'email',
        label: 'Email',
        icon: <MdEmail className="text-gray-600" size={20} />,
    },
    {
        key: 'dob',
        label: 'Birthdate',
        icon: <MdCalendarToday className="text-gray-600" size={20} />,
    },
    {
        key: 'gender',
        label: 'Gender',
        icon: <FiUserCheck className="text-gray-600" size={20} />,
    },
];
