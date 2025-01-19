import { configureStore } from '@reduxjs/toolkit'
import ordersReducer from '../features/ordersSlice'


export default configureStore({
  reducer: {
    orders : ordersReducer
  }
})