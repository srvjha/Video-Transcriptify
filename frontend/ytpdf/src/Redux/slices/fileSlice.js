import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fileStatus:false,
    file:null
}

const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers:{
        upload(state,action){
            state.fileStatus = action.payload.fileStatus;
            state.file = action.payload.file;
        }
    }
})

export const {upload}  = fileSlice.actions;
export default fileSlice.reducer