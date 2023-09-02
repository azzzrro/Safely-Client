import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen : false
}

const pendingModalSlice:any = createSlice({
    name:"modal",
    initialState,
    reducers:{
        openPendingModal:(state)=>{
            state.isOpen = true
        },
        closePendingModal:(state)=>{
            state.isOpen = false
        }
    }
})

export const {openPendingModal,closePendingModal} = pendingModalSlice.actions

export default pendingModalSlice.reducer