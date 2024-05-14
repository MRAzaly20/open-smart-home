import LampControlRoom from "@/src/components/user/sitting-room/LampControl";
import SideNavbar from "@/src/components/elements/Navbar";
import CardInfo from "@/src/components/elements/CardInfo";
import React, { useState } from "react";
import ACControlRoom from "@/src/components/user/sitting-room/ControlAC";
import SetServer from "@/src/components/elements/SetServer";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import generate from "@/src/utils/generateRoute";

const AirControl = () => {
    // State to manage the visibility of the SetServer component on mobile
    const [isSetServerVisible, setIsSetServerVisible] = useState(false);
    const lampStates = useSelector(state => state.lamps);
    const serverState = useSelector(state => state.server);
    
    const genRoute = generate(100, 1000, 9999);
    
    const kbitsToMbits = value => {
        if (value >= 30) {
            value = value / 30;
            if (Number.isInteger(value)) {
                return value.toFixed(0) + " mbit/s";
            } else {
                return value.toFixed(1) + " mbit/s";
            }
        } else {
            return value.toFixed(0) + " kbit/s";
        }
    };
    return (
        <SideNavbar>
            <section
                className="h-full bg-fixed w-screen bg-cover bg-gray-300 bg-center
            bg-[url('/bg.png')] flex flex-cols-3 items-start
            px-0.5 md:px-0.5"
            >
                <section className='hidden md:block h-screen md:w-2 lg:w-14'></section>
                <main className='w-full lg:ml-36 md:w-auto lg:w-full xl:px-0.5 md:px-xl grid grid-flow-row auto-rows-max '>
                    <div
                        className='w-full md:ml-1 lg:ml-3 xl:ml-1/4
                    2xl:ml-1/4 md:w-[46.5rem] xl:max-w-4xl 2xl:max-w-4xl py-2
                    px-1 xl:px-5 2xl:px-0'
                    >
                        <CardInfo
                            title={"Lamp Control"}
                            total_lamp={6}
                            lamp_on={4}
                            lamp_off={2}
                            places={"Wirobrajan, Yogyakarta"}
                        />
                    </div>
                    <div
                        className='w-full md:ml-1 lg:ml-3 xl:ml-1/4
                    2xl:ml-1/4 md:w-[47rem] xl:max-w-4xl 2xl:max-w-4xl py-2
                    px-1 xl:px-5 2xl:px-0'
                    >
                        <ACControlRoom />
                    </div>
                    {/*JSON.stringify(serverState)*/}
                    {serverState.serverState && (
                        <div
                            className='fixed top-0 md:top-10 left-1/2 transform -translate-x-1/2 p-1 w-full
        h-[50rem] max-w-[23rem] z-20'
                        >
                            <SetServer />
                        </div>
                    )}
                    <div
                        className='hidden xl:block fixed top-0 lg:right-0
                        xl:left-[58.5rem] 2xl:left-[60rem] p-2
                    md:w-[20rem] xl:w-[21.5rem] 2xl:w-[25rem] h-[50rem] z-20'
                    >
                        <SetServer />
                    </div>
                </main>
            </section>
        </SideNavbar>
    );
};

export default AirControl;
