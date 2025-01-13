import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authStatus:false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        isAuthenticated(state,action){
            state.authStatus = action.payload
        }
    }
})

export const {isAuthenticated}  = authSlice.actions;
export default authSlice.reducer