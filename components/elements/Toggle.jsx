import { useState } from "react";

const Toggle = ({ isToggled, onToggled }) => {
    return (
        <label className='inline-flex items-center cursor-pointer'>
            <input
                type='checkbox'
                checked={isToggled}
                onChange={onToggled}
                className='sr-only peer'
            />
            <div
                className={`relative w-11 h-6 ${
                    isToggled ? "bg-teal-500" : "bg-gray-200"
                } peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}
            ></div>
            <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                {isToggled ? "ON" : "OFF"}
            </span>
        </label>
    );
};

export default Toggle;
