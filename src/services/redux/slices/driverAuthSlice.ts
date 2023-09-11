import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    driver:"",
    driverToken:null,
    loggedIn:false
}

export const driverAuthSlice = createSlice({
    name:"driverAuth",
    initialState,
    reducers:{
        driverLogin:((state,action)=>{
            state.driver = action.payload.driver
            state.driverToken = action.payload.driverToken
            state.loggedIn = true
        }),
        driverLogout:(state=>{
            state.driver=""
            state.driverToken=null
            state.loggedIn
        })
    }
})

export const {driverLogin,driverLogout} = driverAuthSlice.actions

export default driverAuthSlice.reducer