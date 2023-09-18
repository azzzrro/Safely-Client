import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin:"",
    loggedIn:false
}


export const adminAuthSlice = createSlice({
    name:"adminAuth",
    initialState,
    reducers:{
        adminLogin:((state,action)=>{
            state.admin = action.payload.admin
            state.loggedIn = true
        }),
        adminLogout:(state=>{
            state.admin=""
            state.loggedIn = false
        })
    }
})

export const {adminLogin,adminLogout} = adminAuthSlice.actions

export default adminAuthSlice.reducer