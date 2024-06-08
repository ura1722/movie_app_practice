// slices/sessionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionId: localStorage.getItem('sessionId') || null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionId(state, action) {
      state.sessionId = action.payload;
      localStorage.setItem('sessionId', action.payload); 
    },
    clearSessionId(state) {
      state.sessionId = null;
      localStorage.removeItem('sessionId'); 
    },
  },
});

export const { setSessionId, clearSessionId } = sessionSlice.actions;

export default sessionSlice.reducer;
