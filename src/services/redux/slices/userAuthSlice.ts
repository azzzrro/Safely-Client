import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:"",
    userToken:null,
    loggedIn:false
}

export const userAuthSlice = createSlice({
    name:"userAuth",
    initialState,
    reducers:{
        userLogin:((state,action)=>{
            state.user = action.payload.user
            state.userToken = action.payload.userToken
            state.loggedIn = true
        }),
        userLogout:(state=>{
            state.user=""
            state.userToken=null
            state.loggedIn
        })
    }
})

export const {userLogin,userLogout} = userAuthSlice.actions

export default userAuthSlice.reducer