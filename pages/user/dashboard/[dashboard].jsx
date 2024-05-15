"use client";
import React, { useState, useEffect } from "react";
import SideNavbar from "@/src/components/elements/Navbar";
import Toggle from "@/src/components/elements/Toggle";
import ControlCard from "@/src/components/elements/ControlCard";
import MonitorCard from "@/src/components/elements/MonitorCard";
import Clouds from "@/src/components/elements/Clouds";
import NavRoom from "@/src/components/elements/NavRoom";
import SitRoomPanel from "@/src/components/user/panels/SitRoomPanel";
import BadRoomPanel from "@/src/components/user/panels/BadRoomPanel";
import BathRoomPanel from "@/src/components/user/panels/BathRoom";
import KitchenRoom from "@/src/components/user/panels/KitchenRoom";
import { signOut, getSession } from "next-auth/react";
import useLocalStorage from "@/src/hooks/useLocalStorage";
import axios from "axios";
import Mqtt from "@/src/server/mqtt_server/broker";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import generate from "@/src/utils/generateRoute";


const AboutPage = () => {
    const [data, setData] = useState(false);
    const [resp, setResp] = useState();
    const router = useRouter();
    const [value, setValue] = useLocalStorage("token");
    const [isToggled, setIsToggled] = useState(false);
    const [isRoom, setRoom] = useState("");
    const { dashboard } = router.query;
    
    const genRoute = generate(40, 1000, 9999);
    
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
    useEffect(() => {
        if (!dashboard) {
            router.push(`/user/dashboard/${genRoute}`);
        }
    }, [dashboard, router]);

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
      dashboard ? (
        <div>
            <SideNavbar>
                <div
                    className="h-screen w-screen bg-cover bg-gray-300 bg-center
                bg-[url('/bg.png')] sm:items-start md:flex md:flex-cols-2 gap-1"
                >
                    <div
                        className='md:relative md:flex md:w-[250px]
                        md:flex-col md:py-4
                    items-center justify-center md:h-screen
            md:max-h-[50rem] md:px-0'
                    ></div>
                    <div
                        className='md:relative flex md:w-full sm:w-full flex-col py-4
                    items-center justify-center sm:mx-auto h-screen
                    sm:max-h-[40rem]
            md:max-h-[50rem] px-3 md:px-0'
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
                        <div className='absolute blur-2xl top-12 w-1/2 h-14 bg-amber-400'></div>
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
                            className='w-full md:px-2 grid sm:grid-cols-2
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
                </div>
            </SideNavbar>
        </div>
        ): null
    );
};

export default AboutPage;
