import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    driver:"",
    driver_id:"",
    driverToken:null,
    loggedIn:false
}

export const driverAuthSlice = createSlice({
    name:"driverAuth",
    initialState,
    reducers:{
        driverLogin:((state,action)=>{
            state.driver = action.payload.driver
            state.driver_id = action.payload.driver_id
            state.driverToken = action.payload.driverToken
            state.loggedIn = true
        }),
        driverLogout:(state=>{
            state.driver=""
            state.driver_id=""
            state.driverToken=null
            state.loggedIn = false
        })
    }
})

export const {driverLogin,driverLogout} = driverAuthSlice.actions

export default driverAuthSlice.reducer