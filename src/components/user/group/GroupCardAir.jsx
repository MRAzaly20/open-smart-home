import { useState } from "react";
import Link from "next/link";
import Toggle from "../../elements/Toggle";
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineHome,
    MdSettings
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleServer } from "../../../utils/serverSlice";
import { Slider } from "rsuite";
import "rsuite/Slider/styles/index.css";
import dynamic from "next/dynamic";
import generate from "@/src/utils/generateRoute";


const GaugeComponent = dynamic(() => import("react-gauge-component"), {
    ssr: false
});

const GroupAir = ({ isState, onState, setServer, title, room_name }) => {
    const dispatch = useDispatch();
    const serverState = useSelector(state => state.server.serverState);
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
    const genRoute = generate(100, 1000, 9999);
    return (
        <section>
            <main
                className='p-2 px-6 w-full h-auto backdrop-blur-3xl isolate
                rounded-xl bg-white/30 shadow-lg ring-1 ring-black/5 z-20
                peer-focus:left-0 peer:transition ease-out delay-150
                duration-200'
            >
                <aside className='flex flex-col justify-start item-center'>
                    {/*<GaugeComponent
                        arc={{
                            nbSubArcs: 70,
                            colorArray: ["#5BE12C", "#F5CD19", "#EA4228"],
                            width: 0.3,
                            padding: 0.003
                        }}
                        labels={{
                            valueLabel: {
                                fontSize: 40,
                                formatTextValue: kbitsToMbits
                            },
                            tickLabels: {
                                type: "outer",
                                ticks: [
                                    { value: 16 },
                                    { value: 17 },
                                    { value: 18 },
                                    { value: 19 },
                                    { value: 20 },
                                    { value: 21 },
                                    { value: 22 },
                                    { value: 23 },
                                    { value: 24 },
                                    { value: 25 },
                                    { value: 26 },
                                    { value: 27 },
                                    { value: 28 },
                                    { value: 29 },
                                    { value: 30 },
                                    { value: 31 },
                                    { value: 32 }
                                ],
                                valueConfig: {
                                    formatTextValue: kbitsToMbits
                                }
                            }
                        }}
                        value={32}
                        minValue={16}
                        maxValue={66}
                    />*/}
                    <GaugeComponent
                        arc={{
                            width: 0.4,
                            padding: 0.005,
                            cornerRadius: 5,
                            // gradient: true,
                            subArcs: [
                                {
                                    limit: 20,
                                    color: "#EA4228",
                                    showTick: true,
                                    tooltip: {
                                        text: "Too low temperature!",
                                        style: { fontSize: "8px" }
                                    },
                                    onClick: () =>
                                        console.log(
                                            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                                        ),
                                    onMouseMove: () =>
                                        console.log(
                                            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
                                        ),
                                    onMouseLeave: () =>
                                        console.log(
                                            "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"
                                        )
                                },
                                {
                                    limit: 26,
                                    color: "#F5CD19",
                                    showTick: true,
                                    tooltip: {
                                        text: "Low temperature!",
                                        style: { fontSize: "8px" }
                                    }
                                },
                                {
                                    limit: 30,
                                    color: "#5BE12C",
                                    showTick: true,
                                    tooltip: {
                                        text: "OK temperature!",
                                        style: { fontSize: "8px" }
                                    }
                                },
                                {
                                    color: "#EA4228",
                                    tooltip: {
                                        text: "Too high temperature!",
                                        style: { fontSize: "8px" }
                                    }
                                }
                            ]
                        }}
                        pointer={{
                            color: "#345243",
                            length: 0.8,
                            width: 10
                            // elastic: true,
                        }}
                        labels={{
                            valueLabel: {
                                formatTextValue: value => value + "ºC"
                            },
                            tickLabels: {
                                type: "outer",
                                valueConfig: {
                                    formatTextValue: value => value + "ºC",
                                    fontSize: 7
                                },
                                ticks: [{ value: 23 }]
                            }
                        }}
                        value={30}
                        minValue={16}
                        maxValue={35}
                    />
                    <div
                        className='text-center h-auto w-auto rounded-lg
                                    mr-5 p-2 text-xs text-black bg-white/20'
                    >
                        <h2>temperature settings</h2>
                    </div>
                    <Slider
                        className='mt-3 w-full z-30'
                        max={35}
                        min={16}
                        defaultValue={16}
                        progress
                    />
                    {/*<GaugeComponent
                        arc={{
                            subArcs: [
                                {
                                    limit: 20,
                                    color: "#EA4228",
                                    showTick: true
                                },
                                {
                                    limit: 40,
                                    color: "#F58B19",
                                    showTick: true
                                },
                                {
                                    limit: 60,
                                    color: "#F5CD19",
                                    showTick: true
                                },
                                {
                                    limit: 100,
                                    color: "#5BE12C",
                                    showTick: true
                                }
                            ]
                        }}
                        labels={{
                            valueLabel: {
                                formatTextValue: value => value + "ºC"
                            },
                            tickLabels: {
                                type: "outer",
                                valueConfig: {
                                    formatTextValue: value => value + "ºC",
                                    fontSize: 10
                                },
                                ticks: [
                                    { value: 23 },
                                ]
                            }
                        }}
                        value={50}
                    />*/}

                    <h1
                        className='text-base text-center cursor-pointer
                    font-bold text-blue-900 border-b border-gray-100
                    pb-2 w-full'
                    >
                        {title}
                    </h1>
                    <article
                        className=' my-2 justify-items-center border-b grid
                    grid-cols-2 gap-20 border-gray-100 pb-2'
                    >
                        <Link
                            href={`/user/dashboard/${genRoute}`}
                            className='flex w-auto mb-2 justify-start
                                pointer-events-auto items-center gap-4 pl-5  p-2 rounded-md
                                group cursor-pointer m-auto'
                        >
                            <MdOutlineHome
                                className='text-3xl text-gray-800
                            group-hover:text-white mr-8'
                            />
                            <h4
                                className='fixed font-bold cursor-pointer
                                text-md
                            text-blue-900 border-gray-100 ml-10'
                            >
                                {room_name}
                            </h4>
                        </Link>
                        <div
                            className='justify-items-center border-b grid
                    grid-cols-2 gap-14'
                        >
                            <div className='relative top-3'>
                                <Toggle
                                    isToggled={isState}
                                    onToggled={onState}
                                />
                            </div>
                            <button
                                onClick={setServer}
                                className='relative bottom-1 hover:text-white'
                            >
                                <MdSettings
                                    className='text-xl text-gray-800
                          hover:text-white mr-8'
                                />
                            </button>
                        </div>
                    </article>
                </aside>
            </main>
        </section>
    );
};

export default GroupAir;
