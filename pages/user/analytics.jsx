import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import SideNavbar from "@/components/elements/Navbar";
import AnalyticsCard from "@/components/elements/AnalyticsCard";
import { useRouter } from "next/router";
import React from "react";
import AreaChartPlot from "@/components/user/charts/ChartPlot";
import BarChartPlot from "@/components/user/charts/BarChart";
import LineChartPlot from "@/components/user/charts/LineChart";
import PieChartPlot  from "@/components/user/charts/PieChart";


export default function profile() {
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/");
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
                className="h-screen w-screen bg-cover bg-gray-300 bg-center
            bg-[url('/bg.png')] sm:items-start"
            >
                <div className='sm:w-full px-2 md:px-1 md:w-full md:max-w-[70rem] md:ml-56 py-2'>
                    <AnalyticsCard
                        weather={"Cloudy"}
                        temperature={"25°C"}
                        humidity={"24°C"}
                        places={"Wirobrajan, Yogyakarta"}
                    />
                </div>
                <div
                    className='md:ml-56 sm:w-full h-[600px] md:w-full md:max-w-[70rem]
                    md:h-[540px] grid md:grid-cols-2
                sm:grid-cols-1 gap-4 px-2 md:py-5 overflow-y-scroll
                scrolling-touch '
                >
                    <div className='w-full h-[300px] bg-gray-700 rounded-xl'>
                        <AreaChartPlot />
                    </div>
                    <div className='w-full h-[300px] bg-gray-700 rounded-xl'>
                        <PieChartPlot  />
                    </div>
                    <div className='w-full h-[300px] bg-gray-700 rounded-xl'>
                        <LineChartPlot />
                    </div>
                    <div className='w-full h-[300px] bg-gray-700 rounded-xl'>
                        <BarChartPlot />
                    </div>
                    <div className='w-full h-[300px] bg-gray-700 rounded-xl'>
                        <AreaChartPlot />
                    </div>
                    <div className='w-full h-[300px] bg-gray-700 rounded-xl'>
                        <AreaChartPlot />
                    </div>
                </div>
            </div>
        </SideNavbar>
    );
}
