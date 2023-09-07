import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isOpenRejected : false
}

const rejectedModal:any = createSlice({
    name:"rejectedModal",
    initialState,
    reducers:{
        openRejectedModal:(state=>{
            state.isOpenRejected = true
        }),
        closeRejectedModal:(state=>{
            state.isOpenRejected = false
        })
    }
})

export const {openRejectedModal,closeRejectedModal} = rejectedModal.actions

export default rejectedModal.reducer