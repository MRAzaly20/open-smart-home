import { useState } from "react";
import Link from "next/link";
import Toggle from "./Toggle";
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineHome,
    MdOutlineLogout
} from "react-icons/md";

const ControlCard = ({ isState, onState, title, room_name }) => {
    return (
        <div>
            <div
                className='p-2 px-6 w-full h-30 backdrop-blur-3xl isolate
                rounded-xl bg-white/30 shadow-lg ring-1 ring-black/5 z-20
                peer-focus:left-0 peer:transition ease-out delay-150
                duration-200'
            >
                <div className='flex flex-col justify-start item-center'>
                    <h1
                        className='text-base text-center cursor-pointer
                    font-bold text-blue-900 border-b border-gray-100
                    pb-2 w-full'
                    >
                        {title}
                    </h1>
                    <div
                        className=' my-2 justify-items-center border-b grid
                    grid-cols-2 gap-20 border-gray-100 pb-2'
                    >
                        <Link
                            href={"/user/dashboard"}
                            className='flex w-auto mb-2 justify-start
                                pointer-events-auto items-center gap-4 pl-5
                                hover:isolate
                                hover:bg-gray
                                hover:shadow-lg hover:ring-1 hover:ring-black/5 p-2 rounded-md
                                group cursor-pointer hover:shadow-lg m-auto'
                        >
                            <MdOutlineHome
                                className='text-3xl text-gray-800
                            group-hover:text-white mr-8'
                            />
                            <h4
                                className='fixed font-bold cursor-pointer
                                text-md
                            text-blue-900 border-gray-100 ml-10'
                            >
                                {room_name}
                            </h4>
                        </Link>
                        <div className='relative top-3'>
                            <Toggle isToggled={isState} onToggled={onState} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlCard;
