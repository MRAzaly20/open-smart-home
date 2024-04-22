"use client";
import React, { useState } from "react";
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
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, getSession } from "next-auth/react";
import useLocalStorage from "@/hooks/useLocalStorage";
import axios from "axios";

function SideNavbar({ children }) {
    const [state, setState] = useState(false);
    const router = useRouter();
    const [value, setValue] = useLocalStorage("token");

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
        <div>
            <Disclosure as='nav' className='bg-teal-950'>
                <Disclosure.Button
                    onChange={() => setState(true)}
                    className='absolute text-white rounded-lg
                top-6 left-4 inline-flex items-center peer justify-center z-20
                rounded-lg p-2 backdrop-blur-3xl isolate bg-white/0
                hover:text-white focus:outline-none focus:ring-2
                focus:ring-inset focus:ring-white group '
                >
                    <GiHamburgerMenu
                        className='block rounded-lg h-6 w-6'
                        aria-hidden='false'
                    />
                </Disclosure.Button>

                <div
                    className='p-6 w-300 h-full backdrop-blur-3xl isolate
                rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 z-20 fixed
                top-0 -left-96 md:left-0 md:w-300  peer-focus:left-0
                peer:transition ease-out delay-50 duration-100'
                >
                    <div className='flex flex-col justify-start item-center'>
                        <h1 className='text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full'>
                            Virtual Dashboard
                        </h1>
                        <div className=' my-4 border-b border-gray-100 pb-4'>
                            <Link
                                href={"/user/dashboard"}
                                className='flex mb-2 justify-start
                                pointer-events-auto items-center gap-4 pl-5
                                hover:isolate
                                hover:bg-gray
                                hover:shadow-lg hover:ring-1 hover:ring-black/5 p-2 rounded-md
                                group cursor-pointer hover:shadow-lg m-auto'
                            >
                                <MdOutlineSpaceDashboard className='text-2xl text-gray-800 group-hover:text-white' />
                                <h4 className='text-base text-md text-gray-800 group-hover:text-white font-semibold '>
                                    Dashboard
                                </h4>
                            </Link>
                            <Link
                                href={"/"}
                                className='flex  mb-2 justify-start items-center gap-4 pl-5 hover:isolate
                                hover:bg-gray
                                hover:shadow-lg hover:ring-1 hover:ring-black/5 p-2 rounded-md
                                group cursor-pointer hover:shadow-lg m-auto'
                            >
                                <CgProfile className='text-2xl text-gray-800 group-hover:text-white ' />
                                <h3 className='text-base text-gray-800 group-hover:text-white font-semibold '>
                                    Profile
                                </h3>
                            </Link>
                            <Link
                                href={"/"}
                                className='flex  mb-2 justify-start items-center gap-4 pl-5 hover:isolate
                                hover:bg-gray
                                hover:shadow-lg hover:ring-1 hover:ring-black/5 p-2 rounded-md
                                group cursor-pointer hover:shadow-lg m-auto'
                            >
                                <FaRegComments className='text-2xl text-gray-800 group-hover:text-white ' />
                                <h3 className='text-base text-gray-800 group-hover:text-white font-semibold '>
                                    Comments
                                </h3>
                            </Link>
                            <Link
                                href={"/user/analytics"}
                                className='flex  mb-2 justify-start items-center gap-4 pl-5 hover:isolate
                                hover:bg-gray
                                hover:shadow-lg hover:ring-1 hover:ring-black/5 p-2 rounded-md
                                group cursor-pointer hover:shadow-lg m-auto'
                            >
                                <MdOutlineAnalytics className='text-2xl text-gray-800 group-hover:text-white ' />
                                <h3 className='text-base text-gray-800 group-hover:text-white font-semibold '>
                                    Analytics
                                </h3>
                            </Link>
                            <Link
                                href={"/"}
                                className='flex  mb-2 justify-start items-center gap-4 pl-5 hover:isolate
                                hover:bg-gray
                                hover:shadow-lg hover:ring-1 hover:ring-black/5 p-2 rounded-md
                                group cursor-pointer hover:shadow-lg m-auto'
                            >
                                <BiMessageSquareDots className='text-2xl text-gray-800 group-hover:text-white ' />
                                <h3 className='text-base text-gray-800 group-hover:text-white font-semibold '>
                                    Messages
                                </h3>
                            </Link>
                            <Link
                                href={"/"}
                                className='flex  mb-2 justify-start items-center gap-4 pl-5 hover:isolate
                                hover:bg-gray
                                hover:shadow-lg hover:ring-1 hover:ring-black/5 p-2 rounded-md
                                group cursor-pointer hover:shadow-lg m-auto'
                            >
                                <MdOutlineIntegrationInstructions className='text-2xl text-gray-800 group-hover:text-white ' />
                                <h3 className='text-base text-gray-800 group-hover:text-white font-semibold '>
                                    Integration
                                </h3>
                            </Link>
                        </div>
                        {/* setting  */}
                        <div className=' my-4 border-b border-gray-100 pb-4'>
                            <Link
                                href={"/"}
                                className='flex mb-2 justify-start items-center gap-4 pl-5 hover:isolate
                                hover:bg-gray
                                hover:shadow-lg hover:ring-1 hover:ring-black/5 p-2 rounded-md
                                group cursor-pointer hover:shadow-lg m-auto'
                            >
                                <MdOutlineSettings className='text-2xl text-gray-800 group-hover:text-white ' />
                                <h3 className='text-base text-gray-800 group-hover:text-white font-semibold '>
                                    Settings
                                </h3>
                            </Link>
                            <Link
                                href={"/"}
                                className='flex mb-2 justify-start items-center gap-4 pl-5 hover:isolate
                                hover:bg-gray
                                hover:shadow-lg hover:ring-1 hover:ring-black/5 p-2 rounded-md
                                group cursor-pointer hover:shadow-lg m-auto'
                            >
                                <MdOutlineMoreHoriz className='text-2xl text-gray-800 group-hover:text-white ' />
                                <h3 className='text-base text-gray-800 group-hover:text-white font-semibold '>
                                    More
                                </h3>
                            </Link>
                        </div>
                        {/* logout */}
                        <div className=' my-4'>
                            <button
                                onClick={() => handleLogout()}
                                className='flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200 hover:isolate
                                hover:bg-gray
                                hover:shadow-lg hover:ring-1 hover:ring-black/5 p-2 rounded-md
                                group cursor-pointer hover:shadow-lg m-auto'
                            >
                                <MdOutlineLogout className='text-2xl text-gray-800 group-hover:text-white ' />
                                <h3 className='text-base text-gray-800 group-hover:text-white font-semibold '>
                                    Logout
                                </h3>
                            </button>
                        </div>
                    </div>
                </div>
            </Disclosure>
            <main className='flex-1 bg-red'>
                <div>{children}</div>
            </main>
        </div>
    );
}

export default SideNavbar;
