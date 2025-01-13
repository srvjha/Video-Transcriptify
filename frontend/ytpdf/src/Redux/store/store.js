import { configureStore } from "@reduxjs/toolkit";
import authStatusReducer from "../slices/authSlice"

export const store = configureStore({
    reducer:{
        authStatus: authStatusReducer
    }
})