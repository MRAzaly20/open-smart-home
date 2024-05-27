import React, { useState, useEffect } from "react";
import Link from "next/link";
import Dropdown from "./DropDown";
import DropDownType from "./DropDownType";
import { useSelector, useDispatch } from "react-redux";
import {
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdCheckBox,
    MdOutlineLogout
} from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { toggleServer } from "../../utils/serverSlice";
import saveSetting from "@/src/services/connection/createDevice";
import TypeArrayFunction from "@/src/lib/data_type";
import TechArrayFunction from "@/src/lib/protocol";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Toggle from "./Toggle";
import { addOrUpdateIO } from "@/src/utils/IoAddressSlice";
import { addOrUpdateStatus } from "@/src/utils/statusSlice";
import useLocalStorage from "@/src/hooks/useLocalStorage";

const SetServer = ({
    isState,
    onState,
    total_lamp,
    places,
    lamp_on,
    lamp_off
}) => {
    const [location, setLocation] = useState();
    const [value, setValue] = useLocalStorage("token");
    const [ioValue, setIOValue] = useState();
    const [isToggled, setState] = useState(false);
    const dispatch = useDispatch();
    const openSet = () => {
        dispatch(toggleServer());
    };
    const device = useSelector(state => state.device);
    const protocol = useSelector(
        state => state.protocol.devices[device.deviceName]?.protocol
    );
    const statusDevices = useSelector(
        state => state.statusDevice.devices[device.deviceName]?.status
    );
    const setStatusDevice = () => {
        setState(!isToggled);
        dispatch(
            addOrUpdateStatus({
                deviceName: device.deviceName,
                status: isToggled
            })
        );
    };
    const ioAddressVal = useSelector(
        state => state.io.IO[device.deviceName]?.[protocol]?.ioAddress
    );
    const dataTypeVal = useSelector(
        state =>
            state.dataTypeIO.dataType[device.deviceName]?.[protocol]?.[
                ioAddressVal
            ]?.dataTypeIO
    );

    const getAccessToken = () => {
        try {
            const access = Cookies.get("currentUser");
            if (access) {
                const TokenObj = JSON.parse(access);
                return TokenObj?.accessToken;
            }
        } catch (error) {
            console.error("Error accessing the cookie:", error);
            return null;
        }
    };

    const accessToken = getAccessToken();
    
    const chectToken = async () => {
      const roomID = Cookies.get("currentUser");
      const jwt_token = jwtDecode(accessToken);
      alert(JSON.stringify(jwt_token))
    }
    
    const saveDevice = async () => {
        if (!accessToken) {
            console.error("Access token is not available.");
            return;
        }

        const jwt_token = jwtDecode(accessToken);
        const jwt_user_id = jwt_token.user_id;
        const deviceID = Cookies.get("idDevice");
        const roomID = Cookies.get("roomID");
        const res = await saveSetting(
            {
                room: roomID,
                user: parseInt(jwt_user_id),
                name: device.deviceName,
                location: JSON.stringify(location),
                status: isToggled ? "online" : "offline",
                device_type: "digital",
                io_address: ioAddressVal?.toString(),
                data_type: dataTypeVal ? dataTypeVal : null,
                protocol: protocol,
                digital_value: false,
                analog_value: 23.2,
                deviceID: deviceID ? deviceID : "1"
            },
            accessToken
        );
        if (res?.data?.id) {
            Cookies.set("idDevice", res.data.id, {
                expires: 1
            });
        }
        //alert(accessToken.accessToken)
        /*const response = await fetch("/api/services/restricted/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });*/
    };
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            });
        }
    }, []);

    return (
        <section>
            <article
                className='p-2 px-4 w-full md:h-[30rem] backdrop-blur-3xl isolate
    rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200'
            >
                <header className='flex flex-col justify-start item-center'>
                    <nav
                        className='w-full relative grid grid-cols-3 justify-center
                    item-center'
                    ></nav>
                    <button
                        onClick={() => openSet()}
                        className='block xl:hidden relative top-3 hover:text-white'
                    >
                        <IoMdClose
                            className='text-xl text-gray-800
                          hover:text-white '
                        />
                    </button>
                    <div
                        className='justify-center flex flex-cols-4 gap-8
                    border-gray-100 mb-2.5 md:ml-3 ml-0'
                    >
                        <aside
                            className='justify-items-center
                            w-auto grid mt-1
                        grid-cols-1 ml-1'
                        >
                            <div
                                className='
                            w-auto grid mt-1 ml-1'
                            >
                                <h1 className='relative bottom-2.5 ml-2 text-md font-bold text-blue-900 border-gray-100 '>
                                    I/O & Server Settings
                                </h1>
                            </div>
                            <section
                                className='gap-3 justify-items-center
                            w-full grid mt-3
                        grid-cols-1'
                            >
                                <div
                                    className='relative -z-30 p-2 px-4 w-full h-30 backdrop-blur-3xl isolate
    rounded-lg bg-white/20 delay-150 duration-200 justify-items-center'
                                >
                                    <h1
                                        className='-z-30 cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                                    >
                                        {device.deviceName} Device Configuration
                                    </h1>
                                </div>
                                <div
                                    className='w-full md:w-full z-30 p-2 px-4 h-10 backdrop-blur-3xl isolate
    rounded-lg bg-white/20  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200 grid grid-cols-2 '
                                >
                                    <h1
                                        className=' mt-1 -z-30 cursor-pointer
                                        text-xs
                            text-blue-900 border-gray-100 '
                                    >
                                        Device Status
                                    </h1>
                                    <div className='ml-12'>
                                        <Toggle
                                            isToggled={statusDevices}
                                            onToggled={() => setStatusDevice()}
                                        />
                                    </div>
                                </div>
                                <div
                                    className='w-full md:w-full z-30 p-2 px-4 h-10 backdrop-blur-3xl isolate
    rounded-lg bg-white/20  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200 grid grid-cols-2 '
                                >
                                    <h1
                                        className=' mt-1 -z-30 cursor-pointer
                                        text-xs
                            text-blue-900 border-gray-100 '
                                    >
                                        Select Server Connection
                                    </h1>
                                    <div className='ml-12'>
                                        <Dropdown
                                            deviceRoom={device.deviceName}
                                            technologies={TechArrayFunction}
                                        />
                                    </div>
                                </div>
                                <div
                                    className='w-full md:w-full z-10 p-2 px-4 h-10 backdrop-blur-3xl isolate
    rounded-lg bg-white/20  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200 grid grid-cols-2 '
                                >
                                    <h1
                                        className='w-full  mt-1 z-30 cursor-pointer
                                        text-xs
                            text-blue-900 border-gray-100 '
                                    >
                                        Data Type
                                    </h1>
                                    <div className='ml-10 relative bottom-0.5'>
                                        <DropDownType
                                            deviceRoom={device.deviceName}
                                            data={TypeArrayFunction}
                                            protocol={protocol}
                                            ioAddress={ioAddressVal}
                                        />
                                    </div>
                                </div>
                                <div
                                    className='w-full -z-30 p-2 px-4 h-10 backdrop-blur-3xl isolate
    rounded-lg bg-white/20  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200 grid grid-cols-2 gap-2'
                                >
                                    <h1
                                        className='mt-1 -z-30 cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                                    >
                                        Server Connection
                                    </h1>
                                    <div
                                        className='text-center rounded-lg
                                    text-xs text-black bg-white/50 ml-5 '
                                    >
                                        <h2 className='relative top-1'>
                                            {protocol ? protocol : "Unknown"}
                                        </h2>
                                    </div>
                                </div>
                                <div
                                    className='p-2 px-4 w-full h-12 backdrop-blur-3xl isolate
    rounded-lg bg-white/20  peer-focus:left-0 peer:transition ease-out
    delay-150 duration-200 flex flex-cols-2 gap-1 '
                                >
                                    <h1
                                        className='w-1/2 mt-2 cursor-pointer text-xs
                            text-blue-900 border-gray-100 '
                                    >
                                        I/O Address
                                    </h1>
                                    <input
                                        id='search-input'
                                        className=' w-full px-4 py-2 text-gray-800 border bg-violet-500 rounded-md border-gray-300 focus:outline-none'
                                        type='text'
                                        value={ioAddressVal}
                                        placeholder='ex 0.00'
                                        autoComplete='on'
                                        onChange={e =>
                                            dispatch(
                                                addOrUpdateIO({
                                                    deviceName:
                                                        device.deviceName,
                                                    protocol: protocol
                                                        ? protocol
                                                        : "Unknown",
                                                    ioAddress: e.target.value
                                                })
                                            )
                                        }
                                    />
                                </div>
                            </section>
                            <button
                                onClick={() => chectToken()}
                                className='relative ml-1 bottom-0 mt-32 flex mb-2 bg-white/20 justify-start items-center gap-4 pl-5 border border-gray-300 hover:isolate
                                hover:bg-white/30 hover:ring-black/5 p-2 rounded-md
                                group cursor-pointer hover:shadow-lg m-auto'
                            >
                                <MdCheckBox className='text-2xl text-gray-800 group-hover:text-black ' />
                                <h3 className='text-base text-gray-800 group-hover:text-black font-semibold '>
                                    Save Settings
                                </h3>
                            </button>
                        </aside>
                    </div>
                </header>
            </article>
        </section>
    );
};

export default React.memo(SetServer);
