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

const MonitorCard = ({
    isState,
    onState,
    temperature,
    weather,
    places,
    tag_value
}) => {
    const { pressure, humidity, wheater, quality } = tag_value;
    return (
        <div>
            <div
                className='p-2 px-4 w-full md:max-w-[67rem] sm:max-w-[20rem] h-30 backdrop-blur-3xl isolate
    rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200'
            >
                <div className='flex flex-col justify-start item-center'>
                    <div
                        className='w-full relative grid grid-cols-3 justify-center
                    item-center'
                    >
                        <div className='relative left-30'>
                            <Clouds />
                        </div>
                        <h1
                            className='fixed text-base text-center
                        cursor-pointer z-50 mt-11 left-14 font-bold
                        text-blue-900 border-gray-100 ml-4'
                        >
                            {temperature}
                        </h1>
                        <div
                            className='fixed gap-3.5 justify-start left-40
                            w-auto grid mt-3
                        grid-cols-1'
                        >
                            <h1 className='fixed text-3xl font-bold text-blue-900 border-gray-100 '>
                                {weather}
                            </h1>
                            <h1
                                className='fixed cursor-pointer text-xs
                            text-blue-900 mt-12 border-gray-100 '
                            >
                                {places}
                            </h1>
                        </div>
                    </div>
                    <div
                        className='justify-start flex flex-cols-4 gap-8
                    border-gray-100 mb-2.5 ml-3'
                    >
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
                                {wheater}
                            </h1>
                            <h1
                                className='cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                            >
                                wheater
                            </h1>
                        </div>
                        <div
                            className='gap-1 justify-items-center
                            w-auto grid mt-3
                        grid-cols-1'
                        >
                            <h1 className='text-md text-center font-bold text-blue-900 border-gray-100 '>
                                {pressure}
                            </h1>
                            <h1
                                className='cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                            >
                                pressure
                            </h1>
                        </div>
                        <div
                            className='gap-1 justify-items-center
                            w-auto grid mt-3
                        grid-cols-1'
                        >
                            <h1 className='text-md text-center font-bold text-blue-900 border-gray-100 '>
                                {quality}
                            </h1>
                            <h1
                                className='cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                            >
                                quality
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonitorCard;
