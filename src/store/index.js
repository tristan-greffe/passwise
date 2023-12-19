import { configureStore } from '@reduxjs/toolkit'
import componentReducer from './componentSlice.js'

export default configureStore({
  reducer: {
    component: componentReducer
  }
})