import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ControlCard from "../../elements/ControlCard";
import LampState from "../../elements/LampState";
import { toggleLamp } from "../../../utils/lampSlice";
import { toggleServer } from "../../../utils/serverSlice";
import { setDeviceName } from "../../../utils/deviceName";

const LampControlRoom = ({ confServe }) => {
    const dispatch = useDispatch();
    const lampStates = useSelector(state => state.lamps);
    const serverStates = useSelector(state => state.lamps);
    const handleToggle = serverName => {
        dispatch(toggleLamp(serverName));
    };
    const setServerIsOpen = (serverName) => {
        //Promise.all([dispatch(toggleServer()), dispatch(setDeviceName(serverName))]);
        dispatch(setDeviceName(serverName))
        dispatch(toggleServer())
    };

    return (
        <section className='md:w-full md:h-full md:px-2 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-scroll scrolling-touch h-full'>
            {lampStates &&
                Object.keys(lampStates).map(serverName => (
                    <LampState
                        key={serverName}
                        state={`${
                            lampStates[serverName] ? "/l_on.png" : "/l_off.png"
                        }`}
                        isState={lampStates[serverName]}
                        room_name={serverName}
                        onState={() => handleToggle(serverName)}
                        setServer={() => setServerIsOpen(serverName)}
                    />
                ))}
            {/*lampStates &&
                Object.keys(lampStates).map(serverName => (
                    <ControlCard
                        key={serverName}
                        isState={lampStates[serverName]}
                        room_name={serverName}
                        onState={() => handleToggle(serverName)}
                        setServer={() => setServerIsOpen()}
                    />
                ))*/}
        </section>
    );
};

export default LampControlRoom;
