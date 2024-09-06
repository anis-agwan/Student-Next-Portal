import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
    isLoggedIn: false,
    user: {},
    newUserState: {},
    tempToken: {},
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

        state.newUserState = {}

        state.tempToken = {}

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userDetails");

        window.location.href = "/";

        
    },

    rdxSavingSignUpInfo(state, action) {
      state.newUserState = {...action.payload.newUser}
    },

    rdxSignUpUser(state, action) {

    },

    rdxNewPassword(state, action) {
      const newTemp = {...action.payload.tempToken}
      state.tempToken = newTemp;
    }

  }
});

export const authActions = authSlice.actions;

export default authSlice;