import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import SideNavbar from "@/src/components/elements/Navbar";
import AnalyticsCard from "@/src/components/elements/AnalyticsCard";
import { useRouter } from "next/router";
import React from "react";
import AreaChartPlot from "@/src/components/user/charts/ChartPlot";
import BarChartPlot from "@/src/components/user/charts/BarChart";
import LineChartPlot from "@/src/components/user/charts/LineChart";
import PieChartPlot from "@/src/components/user/charts/PieChart";

export default function profile() {
    const router = useRouter();
    const { analytics } = router.query;
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            //router.push("/");
            console.log("Unauthenticated");
        }
    });

    const handleSignOut = async () => {
        const data = await signOut({ redirect: false, callbackUrl: "/" });
        if (data) {
            router.push(data.url);
        }
    };

    return (
        <SideNavbar>
            <div
                className="h-screen lg:h-full w-full bg-cover bg-gray-300 bg-center
            bg-[url('/bg.png')] flex flex-cols-2 sm:items-start"
            >
                <section
                    className='hidden md:block h-screen md:w-2
                            lg:w-0.5'
                ></section>
                <main className='w-full grid grid-cols-1 lg:pl-52 px-1'>
                    <div
                        className='sm:w-full px-2 md:px-1 md:w-full
                md:max-w-full py-2'
                    >
                        <AnalyticsCard
                            weather={"Cloudy"}
                            temperature={"25°C"}
                            humidity={"24°C"}
                            places={"Wirobrajan, Yogyakarta"}
                        />
                    </div>
                    <div
                        className='sm:w-full h-auto md:w-full
                    md:max-w-full
                    md:h-full grid md:grid-cols-2
                sm:grid-cols-1 gap-4 px-2 md:py-5 overflow-y-scroll
                scrolling-touch '
                    >
                        <div className='w-full h-[400px] bg-gray-700 rounded-xl'>
                            <AreaChartPlot />
                        </div>
                        <div className='w-full h-[400px] bg-gray-700 rounded-xl'>
                            <PieChartPlot />
                        </div>
                        <div className='w-full h-[400px] bg-gray-700 rounded-xl'>
                            <LineChartPlot />
                        </div>
                        <div className='w-full h-[400px] bg-gray-700 rounded-xl'>
                            <BarChartPlot />
                        </div>
                        <div className='w-full h-[400px] bg-gray-700 rounded-xl'>
                            <AreaChartPlot />
                        </div>
                        <div className='w-full h-[400px] bg-gray-700 rounded-xl'>
                            <AreaChartPlot />
                        </div>
                    </div>
                </main>
            </div>
        </SideNavbar>
    );
}
