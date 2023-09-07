import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpenPending : false
}

const pendingModalSlice:any = createSlice({
    name:"pendingModal",
    initialState,
    reducers:{
        openPendingModal:(state)=>{
            state.isOpenPending = true
        },
        closePendingModal:(state)=>{
            state.isOpenPending = false
        }
    }
})

export const {openPendingModal,closePendingModal} = pendingModalSlice.actions

export default pendingModalSlice.reducer