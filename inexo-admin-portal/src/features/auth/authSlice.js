import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('inexo_admin_user')
const storedToken = localStorage.getItem('inexo_admin_token')

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('inexo_admin_token', action.payload.token)
      localStorage.setItem('inexo_admin_user', JSON.stringify(action.payload.user))
    },
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('inexo_admin_token')
      localStorage.removeItem('inexo_admin_user')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export const selectCurrentUser = (state) => state.auth.user
export const selectAuthToken = (state) => state.auth.token
export const selectIsAuthenticated = (state) => Boolean(state.auth.token)
export default authSlice.reducer
