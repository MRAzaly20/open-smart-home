import { createSlice } from "@reduxjs/toolkit";

export const dataTypeSlice = createSlice({
    name: "dataType",
    initialState: {
        dataType: {}
    },
    reducers: {
        addOrUpdateDataType: (state, action) => {
            const { deviceName, protocol, ioAddress, dataTypeIO } =
                action.payload;
           if (!state.dataType[deviceName]) {
                state.dataType[deviceName] = {deviceName};
                state.dataType[deviceName][protocol] = {protocol};
                state.dataType[deviceName][protocol][ioAddress] = {ioAddress};
            }
            if (!state.dataType[deviceName][protocol]){
              state.dataType[deviceName][protocol] = {protocol}
            }
            if (!state.dataType[deviceName][protocol][ioAddress]){
              state.dataType[deviceName][protocol][ioAddress] = {ioAddress}
            }
            state.dataType[deviceName][protocol][ioAddress] = { dataTypeIO };
        },
        removeDataType: (state, action) => {
            const { deviceName, protocol, ioAddress, dataType } =
                action.payload;

            delete state.dataType[deviceName][protocol][ioAddress];
        }
    }
});

export const { addOrUpdateDataType, removeDataType } = dataTypeSlice.actions;
export default dataTypeSlice.reducer;
