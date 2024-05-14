"use client";
import React, { useState, useEffect } from "react";
import SideNavbar from "../../../components/elements/Navbar";
import Toggle from "../../../components/elements/Toggle";
import CardPanel from "../sitting-room/CardPanel";
import { signOut, getSession } from "next-auth/react";
import useLocalStorage from "@/src/hooks/useLocalStorage";
import axios from "axios";
import { useRouter } from "next/router";
import AreaChartPlot from "../charts/ChartPlot";

const BathRoomPanel = () => {
    const [data, setData] = useState(false);
    const [resp, setResp] = useState();
    const router = useRouter();
    const [value, setValue] = useLocalStorage("token");
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };
    //const status = getSession();

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
            <div
                className='w-full md:w-[66rem] grid grid-cols-2
                        md:grid-cols-5 gap-4 md:gap-4'
            >
                <CardPanel
                    room_name={"Lamp Control"}
                    onState={() => setIsToggled(!isToggled)}
                />
                <CardPanel
                    room_name={"AC Control"}
                    onState={() => setIsToggled(!isToggled)}
                />
                <CardPanel
                    room_name={"Tv Control"}
                    onState={() => setIsToggled(!isToggled)}
                />
                <CardPanel
                    room_name={"Voltage Control"}
                    onState={() => setIsToggled(!isToggled)}
                />
                <CardPanel
                    room_name={"Current Control"}
                    onState={() => setIsToggled(!isToggled)}
                />
                <CardPanel
                    room_name={"Power Control"}
                    onState={() => setIsToggled(!isToggled)}
                />
            </div>
        </div>
    );
};

export default BathRoomPanel;
