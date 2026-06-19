import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api/v1',
  launchConfigured: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setApiBaseUrl(state, action) {
      state.apiBaseUrl = action.payload.trim()
    },
    markLaunchConfigured(state) {
      state.launchConfigured = true
    },
  },
})

export const { setApiBaseUrl, markLaunchConfigured } = uiSlice.actions
export const selectApiBaseUrl = (state) => state.ui.apiBaseUrl
export const selectLaunchConfigured = (state) => state.ui.launchConfigured
export default uiSlice.reducer
