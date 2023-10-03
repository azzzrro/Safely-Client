import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin:"",
    adminToken:null,
    loggedIn:false
}


export const adminAuthSlice = createSlice({
    name:"adminAuth",
    initialState,
    reducers:{
        adminLogin:((state,action)=>{
            state.admin = action.payload.admin
            state.loggedIn = true
            state.adminToken = action.payload.adminToken
        }),
        adminLogout:(state=>{
            state.admin=""
            state.loggedIn = false
            state.adminToken = null
        })
    }
})

export const {adminLogin,adminLogout} = adminAuthSlice.actions

export default adminAuthSlice.reducer