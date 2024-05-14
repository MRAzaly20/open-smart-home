import { createSlice } from "@reduxjs/toolkit";

export const deviceSlice = createSlice({
    name: "device",
    initialState: {
        deviceName: ''
    },
    reducers: {
        setDeviceName: (state, action) => {
            state.deviceName = action.payload;
        }
    }
});

export const { setDeviceName } = deviceSlice.actions;
export default deviceSlice.reducer;
