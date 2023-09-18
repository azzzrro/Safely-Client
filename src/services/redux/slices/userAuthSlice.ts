import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:"",
    user_id:"",
    userToken:null,
    loggedIn:false
}

export const userAuthSlice:any = createSlice({
    name:"userAuth",
    initialState,
    reducers:{
        userLogin:((state,action)=>{
            state.user = action.payload.user
            state.user_id = action.payload.user_id
            state.userToken = action.payload.userToken
            state.loggedIn = true
        }),
        userLogout:(state=>{
            state.user=""
            state.user_id = ""
            state.userToken=null
            state.loggedIn =false
        })
    }
})

export const {userLogin,userLogout} = userAuthSlice.actions

export default userAuthSlice.reducer