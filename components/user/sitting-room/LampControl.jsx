import React, { useState } from "react";
import ControlCard from "../../elements/ControlCard";

const LampControlRoom = () => {
    const [lampStates, setLampStates] = useState({
        "lamp 1": false,
        "lamp 2": false,
        "lamp 3": false,
        "lamp 4": false,
        "lamp 5": false,
        "lamp 6": false,
    });

    const handleToggle = (roomName) => {
        setLampStates((prevStates) => ({
            ...prevStates,
            [roomName]: !prevStates[roomName],
        }));
    };

    return (
        <div className="md:w-[48rem] md:px-2 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-scroll scrolling-touch h-full">
            {Object.keys(lampStates).map((roomName) => (
                <ControlCard
                    key={roomName}
                    isState={lampStates[roomName]}
                    room_name={roomName}
                    onState={() => handleToggle(roomName)}
                />
            ))}
        </div>
    );
};

export default LampControlRoom;
