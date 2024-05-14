import { createSlice } from '@reduxjs/toolkit';

export const protocolSlice = createSlice({
    name: 'device',
    initialState: {
        devices: {} 
    },
    reducers: {
        addOrUpdateDevice: (state, action) => {
            const { deviceName, protocol } = action.payload;
            state.devices[deviceName] = { protocol };
        },
        removeDevice: (state, action) => {
            const deviceName = action.payload;
            delete state.devices[deviceName];
        }
    }
});

export const { addOrUpdateDevice, removeDevice } = protocolSlice.actions;

export default protocolSlice.reducer;
