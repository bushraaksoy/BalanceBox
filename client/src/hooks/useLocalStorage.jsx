import { useEffect, useState } from 'react';

const useLocalstorage = (nameInLocalstorage) => {
    const [value, setValue] = useState(() =>
        localStorage.getItem(nameInLocalstorage)
            ? localStorage.getItem(nameInLocalstorage)
            : null
    );

    useEffect(() => {
        localStorage.setItem(nameInLocalstorage, value);
    }, [value]);

    return [value, setValue];
};

export default useLocalstorage;
