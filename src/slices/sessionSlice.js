// slices/sessionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionId: localStorage.getItem('sessionId') || null,
  accountId: localStorage.getItem('accountId') || null, 
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
    setAccountId(state, action) { 
      state.accountId = action.payload;
      localStorage.setItem('accountId', action.payload); 
    },
    clearAccountId(state) { 
      state.accountId = null;
      localStorage.removeItem('accountId'); 
    },
  },
});

export const { setSessionId, clearSessionId, setAccountId, clearAccountId } = sessionSlice.actions;

export default sessionSlice.reducer;
