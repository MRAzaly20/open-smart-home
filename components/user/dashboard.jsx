"use client";
import React, { useState, useEffect } from "react";
import SideNavbar from "../../components/elements/Navbar";
import Toggle from "../../components/elements/Toggle";
import ControlCard from "../../components/elements/ControlCard";
import LampControl from "./sitting-room/LampControl";
import MonitorCard from "../../components/elements/MonitorCard";
import Clouds from "../../components/elements/Clouds";
import NavRoom from "../../components/elements/NavRoom";
import SitRoomPanel from "./panels/SitRoomPanel";
import BadRoomPanel from "./panels/BadRoomPanel";
import BathRoomPanel from "./panels/BathRoom";
import KitchenRoom from "./panels/KitchenRoom";
import { signOut, getSession } from "next-auth/react";
import useLocalStorage from "@/hooks/useLocalStorage";
import axios from "axios";
import { useRouter } from "next/router";

const AboutPage = () => {
    const [data, setData] = useState(false);
    const [resp, setResp] = useState();
    const router = useRouter();
    const [value, setValue] = useLocalStorage("token");
    const [isToggled, setIsToggled] = useState(false);
    const [isRoom, setRoom] = useState("");

    const tag_value = {
        humidity: "24°C",
        wheater: "30°C",
        pressure: "100pa",
        quality: "90"
    };

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };
    //const status = getSession();
    const userRoom = e => {
        setRoom(e);
    };
    const local = async () => {
        const session = await getSession();
        alert(value);
    };
    const check = async () => {
        alert(router.asPath);
    };

    useEffect(() => {
        const status_login = async () => {
            const session = await getSession();
            if (session) {
                await setValue(session);
            }
        };
        return () => status_login();
    }, []);
    useEffect(() => {
        setRoom("1");
    }, []);

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
        <div>
            <SideNavbar>
                <div
                    className='md:relative flex md:w-full sm:w-full flex-col py-4
                    items-center justify-center sm:mx-auto h-screen
                    sm:max-h-[40rem] md:px-2
            md:max-h-[50rem] sm:max-w-[70rem] md:mr-6 px-3 md:px-0'
                >
                    <div
                        className='grid grid-cols-1 md:px-1 mt-1 mb-3 w-full
                    h-300 z-10 '
                    >
                        <MonitorCard
                            weather={"Cloudy"}
                            temperature={"25°C"}
                            tag_value={tag_value}
                            places={"Wirobrajan, Yogyakarta"}
                            isState={isToggled}
                            onState={() => setIsToggled(!isToggled)}
                        />
                    </div>
                    <div className='fixed blur-2xl top-16 w-1/2 h-14 bg-amber-400'></div>
                    <div className='h-14 w-full md:w-full px-1 mb-4 md:ml-0'>
                        <NavRoom
                            room_one={"sitting room"}
                            room_two={"beedroom"}
                            room_tr={"kitchen"}
                            room_fr={"bathroom"}
                            room_f={"home page"}
                            room_s={"home terrace"}
                            handleRoomOne={() => userRoom("1")}
                            handleRoomTwo={() => userRoom("2")}
                            handleRoomTr={() => userRoom("3")}
                            handleRoomFr={() => userRoom("4")}
                            handleRoomF={() => userRoom("5")}
                            handleRoomS={() => userRoom("6")}
                            isRoom={isRoom}
                        />
                    </div>
                    <div
                        className=' w-full md:px-2 grid sm:grid-cols-2
                        md:grid-cols-2 gap-4 md:ml-0.5 overflow-y-scroll
                        scrolling-touch items-start sm:h-full md:h-screen'
                    >
                        {isRoom === "1" ? <SitRoomPanel /> : null}
                        {isRoom === "2" ? <BadRoomPanel /> : null}
                        {isRoom === "3" ? <KitchenRoom /> : null}
                        {isRoom === "4" ? <BathRoomPanel /> : null}
                        {isRoom === "5" ? "hello4" : null}
                        {isRoom === "6" ? "hello5" : null}
                        {isRoom == "" ? <SitRoomPanel /> : null}
                    </div>
                </div>
            </SideNavbar>
        </div>
    );
};

export default AboutPage;
