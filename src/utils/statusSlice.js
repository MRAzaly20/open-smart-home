import { createSlice } from '@reduxjs/toolkit';

export const statusSlice = createSlice({
    name: 'device',
    initialState: {
        devices: {} 
    },
    reducers: {
        addOrUpdateStatus: (state, action) => {
            const { deviceName, status } = action.payload;
            state.devices[deviceName] = { status };
        },
        removeStatus: (state, action) => {
            const deviceName = action.payload;
            delete state.devices[deviceName];
        }
    }
});

export const { addOrUpdateStatus, removeStatus } = statusSlice.actions;

export default statusSlice.reducer;
