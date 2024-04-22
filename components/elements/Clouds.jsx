import { useState } from "react";
import Link from "next/link";
import Toggle from "./Toggle";
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineLogout
} from "react-icons/md";

const Clouds = ({ isState, onState, title }) => {
    return (
        <div>
            <div className='w-32 h-24'>
                <div className='relative left-10 top-2 rounded-full w-16 h-16 bg-white'></div>
                <div
                    className='relative left-3 bottom-6 rounded-full w-16
                    h-12 bg-white'
                ></div>
                <div
                    className='relative left-8 bottom-20 rounded-full w-24
                    h-14 bg-white'
                ></div>
            </div>
        </div>
    );
};

export default Clouds;
