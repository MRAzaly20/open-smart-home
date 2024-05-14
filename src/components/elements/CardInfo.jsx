import { useState } from "react";
import Link from "next/link";
import Toggle from "./Toggle";
import Clouds from "./Clouds";
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineLogout
} from "react-icons/md";

const CardInfo = ({
    title,
    isState,
    onState,
    total_lamp,
    places,
    lamp_on,
    lamp_off
}) => {
    return (
        <div>
            <div
                className='p-2 px-3 w-full h-30 md:h-40 backdrop-blur-3xl isolate
    rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200'
            >
                <div className='flex flex-col justify-start item-center'>
                    <div
                        className='w-full relative grid grid-cols-3 justify-center
                    item-center'
                    ></div>
                    <div
                        className='justify-start flex flex-cols-4 gap-8
                    border-gray-100 mb-2.5 ml-3'
                    >
                        <div
                            className='gap-1 justify-items-start
                            w-auto grid mt-3
                        grid-cols-1 ml-0.5 md:ml-5'
                        >
                            <h1 className='ml-8 md:ml-0 text-md text-center font-bold text-blue-900 border-gray-100 '>
                                Room Control
                            </h1>
                            <div
                                className='gap-3 justify-items-start
                            w-auto grid mt-3
                        grid-cols-2'
                            >
                                <div
                                    className='p-2 px-4 w-full h-30 backdrop-blur-3xl isolate
    rounded-lg bg-white/20  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200'
                                >
                                    <h1
                                        className='cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                                    >
                                        {title} {lamp_on}
                                    </h1>
                                </div>
                                <div
                                    className='p-2 px-4 w-full h-30 backdrop-blur-3xl isolate
    rounded-lg bg-white/20  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200'
                                >
                                    <h1
                                        className='cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                                    >
                                        {title} on {lamp_on}
                                    </h1>
                                </div>
                                <div
                                    className='p-2 px-4 w-full h-30 backdrop-blur-3xl isolate
    rounded-lg bg-white/20  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200'
                                >
                                    <h1
                                        className='cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                                    >
                                        {title} off {lamp_on}
                                    </h1>
                                </div>
                                <div
                                    className='p-2 px-4 w-full h-30 backdrop-blur-3xl isolate
    rounded-lg bg-white/20  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200'
                                >
                                    <h1
                                        className='cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                                    >
                                        connected to server
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/*
                        <div
                            className='gap-1 justify-items-center
                            w-auto grid mt-3
                        grid-cols-1'
                        >
                            <h1 className='text-md text-center font-bold text-blue-900 border-gray-100 '>
                                {humidity}
                            </h1>
                            <h1
                                className='cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                            >
                                humidity
                            </h1>
                        </div>
                        <div
                            className='gap-1 justify-items-center
                            w-auto grid mt-3
                        grid-cols-1'
                        >
                            <h1 className='text-md text-center font-bold text-blue-900 border-gray-100 '>
                                {humidity}
                            </h1>
                            <h1
                                className='cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                            >
                                humidity
                            </h1>
                        </div>
                        <div
                            className='gap-1 justify-items-center
                            w-auto grid mt-3
                        grid-cols-1'
                        >
                            <h1 className='text-md text-center font-bold text-blue-900 border-gray-100 '>
                                {humidity}
                            </h1>
                            <h1
                                className='cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                            >
                                humidity
                            </h1>
                        </div>
                        */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardInfo;
