import {configureStore} from '@reduxjs/toolkit'
import pendingModalSlice from './slices/pendingModalSlice'

export const store = configureStore({
    reducer:{
        pendingModal:pendingModalSlice
    }
})