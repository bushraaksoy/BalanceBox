import { BiSolidShoppingBags } from 'react-icons/bi';
import { FaCalendarCheck, FaHeartPulse } from 'react-icons/fa6';
import { GiClapperboard, GiHouse } from 'react-icons/gi';
import { IoFastFood } from 'react-icons/io5';
import { MdEmojiTransportation } from 'react-icons/md';
import GroceriesIcon from '../assets/icons/groceriesIconFilled.png';
import { FaShoppingBasket } from 'react-icons/fa'; // basket for entertainment
import { RiClapperboardAiFill } from 'react-icons/ri'; // filled for entertainment
import { GiPopcorn } from 'react-icons/gi'; // popcorn for entertainment
import { TbCategoryFilled } from 'react-icons/tb';
import { FiUserCheck } from 'react-icons/fi';

import {
    MdPerson,
    MdAlternateEmail,
    MdEmail,
    MdCalendarToday,
} from 'react-icons/md';

export const expenseCategoryIcons = {
    FOOD: <IoFastFood size={20} className="" />,
    HOUSING: <GiHouse size={20} className="" />,
    TRANSPORT: <MdEmojiTransportation size={20} />,
    HEALTH: <FaHeartPulse />,
    GROCERIES: (
        <img
            src={GroceriesIcon}
            width={20}
            height={20}
            className="dark:brightness-0 dark:invert"
        />
    ),
    SHOPPING: <BiSolidShoppingBags size={20} />,
    ENTERTAINMENT: <GiClapperboard size={20} />,
    SUBSCRIPTION: <FaCalendarCheck size={20} />,
    OTHER: <TbCategoryFilled size={20} />,
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
