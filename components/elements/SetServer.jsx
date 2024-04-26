import { useState } from "react";
import Link from "next/link";
import Dropdown from "./DropDown";
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdCheckBox,
    MdOutlineLogout
} from "react-icons/md";

const SetServer = ({
    isState,
    onState,
    total_lamp,
    places,
    lamp_on,
    lamp_off,
}) => {
    return (
        <div>
            <div
                className='p-2 px-4 w-full md:h-[30rem] backdrop-blur-3xl isolate
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
                        grid-cols-1 ml-1'
                        >
                            <h1 className='text-md text-center font-bold text-blue-900 border-gray-100 '>
                                I/O Settings
                            </h1>
                            <div
                                className='gap-3 justify-items-start
                            w-full grid mt-3
                        grid-cols-1'
                            >

                                <div
                                    className='left-14 relative -z-30 p-2 px-4 w-50 h-30 backdrop-blur-3xl isolate
    rounded-lg bg-white/20 delay-150 duration-200'
                                >
                                    <h1
                                        className='-z-30 cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                                    >
                                        Lamp 1 Configuration Server
                                    </h1>
                                </div>
                                <div
                                    className='w-full z-30 p-2 px-4 h-10 backdrop-blur-3xl isolate
    rounded-lg bg-white/20  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200 grid grid-cols-2 gap-2'
                                >
                                    <h1
                                        className='mt-1 -z-30 cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                                    >
                                        Select Server Connection
                                    </h1>
                                    <div className="ml-12">
                                        <Dropdown />
                                    </div>
                                </div>
                                <div
                                    className='w-full -z-30 p-2 px-4 h-10 backdrop-blur-3xl isolate
    rounded-lg bg-white/20  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200 grid grid-cols-2 gap-2'
                                >
                                    <h1
                                        className='mt-1 -z-30 cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                                    >
                                        Server Connection
                                    </h1>
                                    <div className="text-center rounded-lg text-sm text-black bg-white/50 ml-5">
                                        MQTT Broker
                                    </div>
                                </div>
                                <div
                                    className='p-2 px-4 w-full h-12 backdrop-blur-3xl isolate
    rounded-lg bg-white/20  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200 flex flex-cols-2 gap-1 '
                                >
                                    <h1
                                        className='w-1/2 mt-2 cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                                    >
                                        I/O Address
                                    </h1>
                                    <input
                                        id="search-input"
                                        className=" w-full px-4 py-2 text-gray-800 border bg-violet-500 rounded-md border-gray-300 focus:outline-none"
                                        type="text"
                                        placeholder="ex 0.00"
                                        autoComplete="on"
                                    //onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => console.log("hello")}
                                className='relative ml-1 bottom-0 mt-32 flex mb-2 bg-white/20 justify-start items-center gap-4 pl-5 border border-gray-300 hover:isolate
                                hover:bg-white/30 hover:ring-1 hover:ring-black/5 p-2 rounded-md
                                group cursor-pointer hover:shadow-lg m-auto'
                            >
                                <MdCheckBox className='text-2xl text-gray-800 group-hover:text-black ' />
                                <h3 className='text-base text-gray-800 group-hover:text-black font-semibold '>
                                    Save Settings
                                </h3>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default SetServer;
