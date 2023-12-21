import { configureStore } from '@reduxjs/toolkit'
import componentReducer from './componentSlice.js'
import userReducer from './userSlice.js'

export default configureStore({
  reducer: {
    component: componentReducer,
    user: userReducer
  }
})