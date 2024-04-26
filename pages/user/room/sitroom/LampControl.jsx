import LampControlRoom from "@/components/user/sitting-room/LampControl";
import SideNavbar from "@/components/elements/Navbar";
import React from "react";
import CardInfo from "@/components/elements/CardInfo";
import SetServer from "@/components/elements/SetServer";

const LampControl = () => {
    return (
        <SideNavbar>
            <section className="h-screen w-screen bg-cover bg-gray-300 bg-center bg-[url('/bg.png')] sm:items-start md:items-start">
                <div className="sm:w-full px-1 md:px-1 md:w-[750px] md:ml-56 py-2">
                    <CardInfo
                        total_lamp={6}
                        lamp_on={6}
                        lamp_off={6}
                        places={"Wirobrajan, Yogyakarta"}
                    />
                </div>
                <div className="absolute md:top-20 top-20 w-full md:px-56 md:py-12 py-6 grid items-start h-[620px] md:h-auto">
                    <LampControlRoom />
                </div>
                {/* Position SetServer component */}
                <div className="fixed top-0 right-0 p-2 md:w-[23rem] h-[50rem]">
                    <SetServer />
                </div>
            </section>
        </SideNavbar>
    );
};

export default LampControl;
