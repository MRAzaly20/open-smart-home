import { createSlice } from '@reduxjs/toolkit';

export const lampSlice = createSlice({
  name: 'lamps',
  initialState: {
    "lamp 1": false,
    "lamp 2": false,
    "lamp 3": false,
    "lamp 4": false,
    "lamp 5": false,
    "lamp 6": false,
  },
  reducers: {
    toggleLamp: (state, action) => {
      const roomName = action.payload;
      state[roomName] = !state[roomName];
    },
  },
});

export const { toggleLamp } = lampSlice.actions;
export default lampSlice.reducer;
