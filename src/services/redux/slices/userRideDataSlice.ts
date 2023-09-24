import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpenUserRideData : false,
    ride_id:null
}

export const userRideDataSlice:any = createSlice({
    name : "userRideData",
    initialState,
    reducers:{
        openUserRideData:(state,action)=>{
            state.isOpenUserRideData = true
            state.ride_id = action.payload
        },
        closeUserRideData:(state)=>{
            state.isOpenUserRideData = false
            state.ride_id = null
        }
    }
})

export const {openUserRideData,closeUserRideData} = userRideDataSlice.actions

export default userRideDataSlice.reducer