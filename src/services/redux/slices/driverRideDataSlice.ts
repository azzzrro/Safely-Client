import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpenDriverRideData : false,
    ride_id:null
}

export const driverRideDataSlice:any = createSlice({
    name : "driverRideData",
    initialState,
    reducers:{
        openDriverRideData:(state,action)=>{
            state.isOpenDriverRideData = true
            state.ride_id = action.payload
        },
        closeDriverRideData:(state)=>{
            state.isOpenDriverRideData = false
            state.ride_id = null
        }
    }
})

export const {openDriverRideData,closeDriverRideData} = driverRideDataSlice.actions

export default driverRideDataSlice.reducer