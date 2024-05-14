"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { addOrUpdateDevice, removeDevice } from "@/src/utils/preferredServer";
import { useDispatch, useSelector } from "react-redux";

const Dropdown = ({ technologies, deviceRoom }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);
    const router = useRouter();

    const setVal = tech => {
        if (deviceRoom && tech) {
            //dispatch(removeDevice('Device A'));

            dispatch(
                addOrUpdateDevice({ deviceName: deviceRoom, protocol: tech })
            );
            setIsOpen(!isOpen);
        } else {
            alert("deviceRoom or tech is undefined");
        }
    };

    useEffect(() => {
        const filterItems = () => {
            const items = dropdownRef.current.querySelectorAll("button");
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (
                    searchTerm === "" ||
                    text.includes(searchTerm.toLowerCase())
                ) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        };

        filterItems();
    }, [searchTerm]);

    return (
        <div className='flex items-center justify-center'>
            <div className='relative group'>
                <button
                    id='dropdown-button'
                    className='inline-flex justify-center w-full px-4 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className='mr-2'>{isOpen ? "Close" : "Open"}</span>
                </button>
                <div
                    ref={dropdownRef}
                    id='dropdown-menu'
                    className={`${
                        isOpen ? "block" : "hidden"
                    } z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg
                    bg-violet-200 isolate backdrop-blur-3xl ring-1 ring-black
                    ring-opacity-5 p-1 grid grid-rows space-y-1`}
                >
                    <input
                        id='search-input'
                        className='block w-full px-4 py-2 text-gray-800 border bg-violet-500 rounded-md border-gray-300 focus:outline-none'
                        type='text'
                        placeholder='Search items'
                        autoComplete='off'
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    {technologies.map(tech => (
                        <button key={tech}>
                            <div
                                onClick={() => setVal(tech)}
                                className='block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md'
                            >
                                {tech}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
