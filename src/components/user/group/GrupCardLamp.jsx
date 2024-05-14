import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ControlCard from "../../elements/ControlCard";
import { toggleLamp } from "../../../utils/lampSlice";
import { toggleServer } from "../../../utils/serverSlice";
const LampStatus = ({ confServe }) => {
    const dispatch = useDispatch();
    const lampStates = useSelector(state => state.lamps);
    const serverStates = useSelector(state => state.lamps);
    const handleToggle = serverName => {
        dispatch(toggleLamp(serverName));
    };
    const setServerIsOpen =() => {
        dispatch(toggleServer());
    };

    return (
        <section className='md:w-full md:px-2 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-scroll scrolling-touch h-full'>
            {lampStates &&
                Object.keys(lampStates).map(serverName => (
                    <ControlCard
                        key={serverName}
                        isState={lampStates[serverName]}
                        room_name={serverName}
                        onState={() => handleToggle(serverName)}
                        setServer={() => setServerIsOpen()}
                    />
                ))}
        </section>
    );
};

export default LampStatus;
