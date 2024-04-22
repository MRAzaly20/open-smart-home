import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            setState(item ? JSON.parse(item) : initialValue);
        } catch (error) {
            console.log(error);
        }
    }, [key, initialValue]);

    const setValue = value => {
        try {
            const valueToStore =
                value instanceof Function ? value(state) : value;
            setState(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [state, setValue];
};

export default useLocalStorage;
