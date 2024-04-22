import React, { useState, useEffect } from "react";
import Toggle from "../../elements/Toggle";
import ControlCard from "../../elements/ControlCard";

const LampControlRoom = () => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };
    return (
        <div
            className='md:w-[42rem] grid grid-cols-1
                        md:grid-cols-2 gap-4 overflow-y-scroll
                        scrolling-touch h-full'
        >
            <ControlCard
                isState={isToggled}
                room_name={"lamp 1"}
                onState={() => setIsToggled(!isToggled)}
            />
            <ControlCard
                isState={isToggled}
                room_name={"lamp 2"}
                onState={() => setIsToggled(!isToggled)}
            />
            <ControlCard
                isState={isToggled}
                room_name={"lamp 3"}
                onState={() => setIsToggled(!isToggled)}
            />
            <ControlCard
                isState={isToggled}
                room_name={"lamp 4"}
                onState={() => setIsToggled(!isToggled)}
            />
            <ControlCard
                isState={isToggled}
                room_name={"lamp 5"}
                onState={() => setIsToggled(!isToggled)}
            />
            <ControlCard
                isState={isToggled}
                room_name={"lamp 6"}
                onState={() => setIsToggled(!isToggled)}
            />
        </div>
    );
};

export default LampControlRoom;
