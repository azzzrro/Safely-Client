import {configureStore} from '@reduxjs/toolkit'
import pendingModalSlice from './slices/pendingModalSlice'
import rejectedModalSlice from './slices/rejectedModalSlice'

export const store = configureStore({
    reducer:{
        pendingModal:pendingModalSlice,
        rejectedModal: rejectedModalSlice 
    }
})