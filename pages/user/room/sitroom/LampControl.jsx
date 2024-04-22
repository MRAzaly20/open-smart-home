import LampControlRoom from "@/components/user/sitting-room/LampControl";
import SideNavbar from "@/components/elements/Navbar";
import React, { useState, useEffect } from "react";
import CardInfo from "@/components/elements/CardInfo";

const LampControl = () => {
    return (
        <SideNavbar>
            <section
                className="h-screen w-screen bg-cover bg-gray-300 bg-center
                bg-[url('/bg.png')] sm:items-start md:items-center"
            >
                <div className='sm:w-full px-2 md:px-1 md:w-[750px] md:ml-56 py-2'>
                    <CardInfo
                        weather={"Cloudy"}
                        temperature={"25°C"}
                        humidity={"24°C"}
                        places={"Wirobrajan, Yogyakarta"}
                    />
                </div>
                <div
                    className='absolute md:top-1 top-20 w-full px-3 md:px-60
                    md:py-12 py-6 grid items-start
                h-[620px] md:h-auto'
                >
                    <LampControlRoom />
                </div>
            </section>
        </SideNavbar>
    );
};

export default LampControl;
