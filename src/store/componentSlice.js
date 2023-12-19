import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loader: { open: false}
}

export const componentSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    setLoader: (state, action) => {
      const { open } = action.payload
      return { ...state, loader: { open }}
    }
  }
})

export const { setLoader } = componentSlice.actions

export default componentSlice.reducer