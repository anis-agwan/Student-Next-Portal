import { configureStore } from "@reduxjs/toolkit";
import pbSlice from "./pbQuiz/pb-slice";
import ctSlice from "./ctQuiz/ct-slice";
import ddSlice from "./ddQuiz/dd-slice";
import authSlice from "./authRdxStore/auth-slice";


const store = configureStore({
    reducer: {
        pb: pbSlice.reducer, 
        ct: ctSlice.reducer,
        dd: ddSlice.reducer,
        auth: authSlice.reducer,
    }
})

export default store;