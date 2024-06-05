import { configureStore } from "@reduxjs/toolkit";
import pbSlice from "./pbQuiz/pb-slice";
import ctSlice from "./ctQuiz/ct-slice";


const store = configureStore({
    reducer: {
        pb: pbSlice.reducer, 
        ct: ctSlice.reducer
    }
})

export default store;