import { createSlice } from '@reduxjs/toolkit'

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    open: false,
    message: '',
    severity: 'info',
  },
  reducers: {
    showToast: (state, action) => {
      state.open = true
      state.message = action.payload.message
      state.severity = action.payload.severity || 'info'
    },
    hideToast: (state) => {
      state.open = false
    },
  },
})

export const { showToast, hideToast } = toastSlice.actions
export const selectToast = (state) => state.toast
export default toastSlice.reducer
