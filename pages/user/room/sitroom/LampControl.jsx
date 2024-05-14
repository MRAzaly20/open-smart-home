
import LampControlRoom from "@/src/components/user/sitting-room/LampControl";
import LampStatus from "@/src/components/user/group/GrupCardLamp";
import SideNavbar from "@/src/components/elements/Navbar";
import React, { useState } from "react";
import CardInfo from "@/src/components/elements/CardInfo";
import SetServer from "@/src/components/elements/SetServer";
import { useSelector } from "react-redux";

const LampControl = () => {
    const [isSetServerVisible, setIsSetServerVisible] = useState(false);
    const lampStates = useSelector(state => state.lamps);
    const serverState = useSelector(state => state.server);
    const device = useSelector(state => state.device);
   
    return (
        <SideNavbar>
            <section
                className="h-full bg-fixed md:h-full w-screen bg-cover bg-gray-300
            bg-center bg-[url('/bg.png')] flex flex-cols-3 items-start px-3 md:px-3"
            >
                <section className='hidden md:inline h-screen w-0.5'></section>
                <main className='w-full lg:px-24 md:px-0.5 xl:px-40'>
                    <div className='w-full 2xl:w-[50rem] md:ml-0.5 lg:ml-24 xl:ml-10 2xl:ml-5 xl:max-w-2xl 2xl:max-w-4xl py-2'>
                        <CardInfo
                            title={"Lamp Control"}
                            total_lamp={6}
                            lamp_on={4}
                            lamp_off={2}
                            places={"Wirobrajan, Yogyakarta"}
                        />
                    </div>

                    <div
                        className='w-full 2xl:w-[50.5rem] md:h-auto
                        md:ml-0.5 lg:ml-24
                        2xl:ml-5 xl:ml-10 xl:max-w-2xl
                    2xl:max-w-4xl py-2'
                    >
                        <LampControlRoom />
                    </div>
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
                        xl:left-[56rem] 2xl:left-[63rem] p-2
                    md:w-[20rem] xl:w-[23rem] h-[50rem] z-20'
                    >
                        <SetServer />
                    </div>
                </main>
            </section>
        </SideNavbar>
    );
};

export default LampControl;
