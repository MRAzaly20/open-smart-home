"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { addOrUpdateDataType, removeDataType } from "@/src/utils/dataTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const DropDownType = props => {
    const { deviceRoom, data, protocol, ioAddress } = props;
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [ioType, setIoType] = useState("");
    const dropdownRef = useRef(null);
    const router = useRouter();

    const device = useSelector(state => state.device);
    const protocolIO = useSelector(
        state => state.protocol.devices[device.deviceName]?.protocol
    );
    const ioAddressVal = useSelector(
        state => state.io.IO[device.deviceName]?.[protocolIO]?.ioAddress
    );

    const dataTypeVal = useSelector(
        state =>
            state.dataTypeIO.dataType[device.deviceName]?.[protocolIO]?.[
                ioAddressVal
            ]?.dataTypeIO
    );

    const setVal = typeData => {
        setIoType(typeData);
        if (deviceRoom && typeData) {
            //dispatch(removeDevice('Device A'));
            dispatch(
                addOrUpdateDataType({
                    deviceName: deviceRoom,
                    protocol: protocol,
                    ioAddress: ioAddress,
                    dataTypeIO: typeData
                })
            );

            setIsOpen(false);
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
                <span
                    className='w-auto shadow-sm flex flex-cols-2 gap-0
                focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100
                focus:ring-blue-500'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <button
                        id='dropdown-button'
                        className='inline-flex py-1.5 px-1 items-center justify-center
                        w-auto px-2 py-0 text-xs font-medium text-gray-700
                        bg-violet-300 rounded-bl-md
                    rounded-tl-md'
                    >
                        {dataTypeVal ? (
                            <label>{dataTypeVal}</label>
                        ) : (
                            <label>{ioType ? ioType : "select"}</label>
                        )}
                    </button>
                    <span
                        className='flex w-3 bg-blue-300 rounded-br-md
                    rounded-tr-md justify-center items-center px-2.5'
                    >
                        <h1 className='text-lg font-bold'>
                            {isOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
                        </h1>
                    </span>
                </span>
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
                    <div
                        className='w-full max-h-[200px] overflow-y-scroll
                scrolling-touch'
                    >
                        {data.map(type => (
                            <button className='w-full h-auto' key={type}>
                                <div
                                    onClick={() => setVal(type)}
                                    className='block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md'
                                >
                                    {type}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropDownType;
