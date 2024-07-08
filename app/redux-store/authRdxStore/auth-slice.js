import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
    isLoggedIn: false,
    user: {}
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    
    rdxLoginUser(state, action) {
        console.log("RDX ON LOGIN");
        state.user = action.payload.user
        state.isLoggedIn = action.payload.isLoggedIn
    },

    rdxLogoutUser(state) {
        console.log("RDX ON LOGOUT");
        state.isLoggedIn = false
        state.user = {}
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;