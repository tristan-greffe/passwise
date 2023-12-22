import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modal: { open: false, modalConstructionKey: '' },
  loader: { open: false }
}

export const componentSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    setModal: (state, action) => {
      const { open, modalConstructionKey } = action.payload
      return { ...state, modal: { open, modalConstructionKey } }
    },
    setLoader: (state, action) => {
      const { open } = action.payload
      return { ...state, loader: { open }}
    }
  }
})

export const { setModal, setLoader } = componentSlice.actions

export default componentSlice.reducer