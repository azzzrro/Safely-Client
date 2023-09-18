import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen : false
}

const driverSearch = createSlice({
    name:"driverSearch",
    initialState,
    reducers:{
        startSearching:(state=>{
            state.isOpen = true 
        }),
        cancelSearching:(state=>{
            state.isOpen = false
        })
    }
})

export const {startSearching,cancelSearching} = driverSearch.actions

export default driverSearch.reducer