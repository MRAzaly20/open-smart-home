import { createSlice } from '@reduxjs/toolkit';

export const airSlice = createSlice({
  name: 'AC',
  initialState: {
    "AC 1": false,
    "AC 2": false,
    "AC 3": false,
    "AC 4": false,
    "AC 5": false,
    "AC 6": false,
  },
  reducers: {
    airVal: (state, action) => {
      const roomName = action.payload;
      state[roomName] = !state[roomName];
    },
  },
});

export const { airVal } = airSlice.actions;
export default airSlice.reducer;
