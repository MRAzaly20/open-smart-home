import { createSlice } from '@reduxjs/toolkit';

export const serverSlice = createSlice({
  name: 'server',
  initialState: {
    serverState: false,
  },
  reducers: {
    toggleServer: (state) => {
      state.serverState = !state.serverState;
    },
  },
});

export const { toggleServer } = serverSlice.actions;
export default serverSlice.reducer;
