import { useState } from "react";
import Link from "next/link";
import Toggle from "../../elements/Toggle";
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineHome,
    MdOutlineLogout
} from "react-icons/md";
import { useRouter } from "next/router";

const CardPanel = ({ isState, onState, title, room_name, path }) => {
    const router = useRouter();
    const handleRoute = e => {
        if (e) router.push(e);
    };
    return (
        <div>
            <div
                className='p-2 px-6 sm:w-1/2 md:w-full h-30 backdrop-blur-3xl isolate
                rounded-xl bg-white/30 shadow-lg ring-1 ring-black/5 z-20
                peer-focus:left-0 peer:transition ease-out delay-150
                duration-200'
            >
                <div className='flex flex-col justify-start item-center'>
                    <h1
                        className='text-base text-center cursor-pointer
                    font-bold text-blue-900 border-b border-gray-100
                    pb-2 w-full sm:hidden'
                    >
                        {title}
                    </h1>
                    <div
                        className=' my-2 justify-items-start border-b grid
                    grid-cols-1 gap-2 border-gray-100 pb-2'
                    >
                        <div
                            className='flex w-auto mb-2 justify-start
                                pointer-events-auto items-center gap-2 pl-1 p-2 rounded-md group cursor-pointer  '
                        >
                            <MdOutlineHome
                                className='text-xl text-gray-800
                            group-hover:text-white mr-8'
                            />
                            <h4
                                className='fixed font-bold cursor-pointer
                                text-sm
                            text-blue-900 border-gray-100 mr-3 ml-7'
                            >
                                {room_name}
                            </h4>
                        </div>
                        <button
                            onClick={() => handleRoute(path)}
                            className='flex mb-2 justify-start
                                pointer-events-auto items-center gap-2 pl-1
                                bg-white/30 p-2 rounded-md
                                group cursor-pointer hover:shadow-lg m-1'
                        >
                            <p
                                className=' font-bold cursor-pointer
                                text-[13px] md:text-md
                            text-blue-900 border-gray-100  ml-2'
                            >
                                show control ›
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPanel;
