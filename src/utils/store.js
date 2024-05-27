// store.js
import { configureStore } from "@reduxjs/toolkit";
import serverReducer from "./serverSlice";
import lampReducer from "./lampSlice";
import airReducer from "./AirSlice";
import deviceReducer from "./deviceName";
import dataTypeReducer from "./dataTypeSlice";
import IOReducer from "./IoAddressSlice";
import protocolReducer from "./preferredServer";
import statusReducer from "./statusSlice";

export const store = configureStore({
    reducer: {
        server: serverReducer,
        lamps: lampReducer,
        AC: airReducer,
        device: deviceReducer,
        protocol: protocolReducer,
        dataTypeIO: dataTypeReducer,
        io: IOReducer,
        statusDevice : statusReducer
    }
});
