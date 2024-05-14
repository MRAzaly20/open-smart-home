import LampControlRoom from "@/src/components/user/sitting-room/LampControl";
import SideNavbar from "../../elements/Navbar";
import React, { useState } from "react";
import GroupAir from "../group/GroupCardAir";
import SetServer from "../../elements/SetServer";
import { useSelector,useDispatch } from "react-redux";
import { airVal } from "../../../utils/AirSlice";
import { toggleServer } from "../../../utils/serverSlice";

const ACControlRoom = ({ confServe }) => {
    const dispatch = useDispatch();
    const ACStates = useSelector(state => state.AC);
    const serverStates = useSelector(state => state.AC);
    const handleToggle = serverName => {
        dispatch(airVal(serverName));
    };
    const setServerIsOpen = () => {
        dispatch(toggleServer());
    };
   return (
        <section className='md:w-full md:px-2 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-scroll scrolling-touch h-full'>
            {ACStates &&
                Object.keys(ACStates).map(serverName => (
                    <GroupAir
                        key={serverName}
                        isState={ACStates[serverName]}
                        room_name={serverName}
                        onState={() => handleToggle(serverName)}
                        setServer={() => setServerIsOpen()}
                    />
                ))}
        </section>
    );
};

export default ACControlRoom;
