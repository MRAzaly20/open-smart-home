import { createSlice } from "@reduxjs/toolkit";

export const IOSlice = createSlice({
    name: "io",
    initialState: {
        IO: {}
    },
    reducers: {
        addOrUpdateIO: (state, action) => {
            const { deviceName, protocol, ioAddress } = action.payload;
            if (!state.IO[deviceName]) {
                state.IO[deviceName] = {deviceName};
            }
            state.IO[deviceName][protocol] = { ioAddress };
        },
        removeIO: (state, action) => {
            const { deviceName, protocol, ioAddress } = action.payload;

            delete state.IO[deviceName][protocol];
        }
    }
});

export const { addOrUpdateIO, removeIO } = IOSlice.actions;
export default IOSlice.reducer;
