// store.js
import { configureStore } from '@reduxjs/toolkit';
import serverReducer from './serverSlice';
import lampReducer from './lampSlice';
import airReducer from './AirSlice';
import deviceReducer from './deviceName';
import protocolReducer from './preferredServer';

export const store = configureStore({
  reducer: {
    server: serverReducer,
    lamps: lampReducer,
    AC: airReducer,
    device: deviceReducer,
    protocol: protocolReducer
  },
});
