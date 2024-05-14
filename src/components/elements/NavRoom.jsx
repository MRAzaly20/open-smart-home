"use client";
import React, { useState, useEffect } from "react";

import { signOut, getSession } from "next-auth/react";
import useLocalStorage from "@/src/hooks/useLocalStorage";
import axios from "axios";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineLogout
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";

const NavRoom = ({
    isRoom,
    room_one,
    room_two,
    room_tr,
    room_fr,
    room_f,
    room_s,
    handleRoomOne,
    handleRoomTwo,
    handleRoomTr,
    handleRoomFr,
    handleRoomF,
    handleRoomS
}) => {
    const [data, setData] = useState(false);
    const [resp, setResp] = useState();
    const router = useRouter();
    const [value, setValue] = useLocalStorage("token");
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const handleLogout = async () => {
        //    setValue("")
        const all_token = JSON.parse(JSON.stringify(value));
        const _accessToken = all_token.accessToken;
        const _refreshToken = all_token.refreshToken;
        //alert(_accessToken);

        try {
            const response = await axios.post(
                "/api/services/logout",
                {
                    refresh: _refreshToken
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${_accessToken}`
                    }
                }
            );

            if (response) {
                await setData(true);
                await window.localStorage.removeItem("token");
                await signOut({ redirect: false });
                //alert(response.data);
                router.push("/");
            }
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    return (
        <div
            className='w-full md:max-w-[67rem] sm:max-w-[20rem] flex
            overflow-x-auto sm:gap-8 justify-items-center md:h-14 sm:h-full
            h-full rounded-xl mb-3
            px-4 py-2 backdrop-blur-3xl isolate bg-white/20'
        >
            <button
                onClick={handleRoomOne}
                className='relative w-100 max-w-[50rem] p-2 px-7 h-30 isolate
                rounded-xl group peer-focus:left-0 peer:transition ease-out
                delay-150 bg-white/20
                duration-200 mr-5 md:mr-1 justify-items-center'
            >
                <div
                    className={`w-full peer:transition ease-out delay-10
                    duration-200 justify-items-center
                    ${isRoom === "1" ? "border-b" : ""} grid
                    grid-cols-3 gap-10 border-gray-100`}
                >
                    <CgProfile
                        className={`relative text-2xl text-gray-800
                    ${isRoom === "1" ? "text-white" : ""} mb-2 ml-10 mr-10`}
                    />

                    <span
                        className={`relative w-20 ml-10 text-sm font-medium
                    text-gray-900 dark:text-gray-300 ${
                        isRoom === "1" ? "text-white" : ""
                    }
                    font-semibold mt-0.5`}
                    >
                        {room_one}
                    </span>
                </div>
            </button>
            <button
                onClick={handleRoomTwo}
                className='relative w-600 max-w-[50rem] p-2 px-7 h-30 isolate
                rounded-xl bg-white/20 group
                peer-focus:left-0 peer:transition ease-out delay-150
                duration-200 md:mr-1 mr-5 justify-items-center mt-0.5'
            >
                <div
                    className={`w-full peer:transition ease-out delay-10
                    duration-200 justify-items-center ${
                        isRoom === "2" ? "border-b" : ""
                    } grid
                    grid-cols-3 gap-10 border-gray-100`}
                >
                    <CgProfile
                        className={`relative text-2xl text-gray-800
                    ${isRoom === "2" ? "text-white" : ""} mb-2 ml-10 mr-10`}
                    />

                    <span
                        className={`relative w-20 ml-10 text-sm font-medium
                    text-gray-900 dark:text-gray-300 ${
                        isRoom === "2" ? "text-white" : ""
                    }
                    font-semibold`}
                    >
                        {room_two}
                    </span>
                </div>
            </button>
            <button
                onClick={handleRoomTr}
                className='md:mr-1 relative w-600 max-w-[50rem] p-2 px-7 h-30 isolate
                rounded-xl bg-white/20 group
                peer-focus:left-0 peer:transition ease-out delay-150
                duration-200 mr-5 justify-items-center mt-0.5'
            >
                <div
                    className={`w-full peer:transition ease-out delay-10 duration-200 justify-items-center ${
                        isRoom === "3" ? "border-b" : ""
                    } grid
                    grid-cols-3 gap-10 border-gray-100`}
                >
                    <CgProfile
                        className={`relative text-2xl text-gray-800
                    ${isRoom === "3" ? "text-white" : ""} mb-2 ml-10 mr-10`}
                    />

                    <span
                        className={`relative w-20 ml-10 text-sm font-medium
                    text-gray-900 dark:text-gray-300 ${
                        isRoom === "3" ? "text-white" : ""
                    }
                    font-semibold`}
                    >
                        {room_tr}
                    </span>
                </div>
            </button>
            <button
                onClick={handleRoomFr}
                className='relative w-600 max-w-[50rem] p-2 px-7 h-30 isolate
                rounded-xl bg-white/20 group
                peer-focus:left-0 peer:transition ease-out delay-150
                duration-200 mr-5 justify-items-center mt-0.5'
            >
                <div
                    className={`w-full peer:transition ease-out delay-10 duration-200 justify-items-center ${
                        isRoom === "4" ? "border-b" : ""
                    } grid
                    grid-cols-3 gap-10 border-gray-100`}
                >
                    <CgProfile
                        className={`relative text-2xl text-gray-800
                    ${isRoom === "4" ? "text-white" : ""} mb-2 ml-10 mr-10`}
                    />

                    <span
                        className={`relative w-20 ml-10 text-sm font-medium
                    text-gray-900 dark:text-gray-300 ${
                        isRoom === "4" ? "text-white" : ""
                    }
                    font-semibold`}
                    >
                        {room_fr}
                    </span>
                </div>
            </button>
        </div>
    );
};
export default NavRoom;
