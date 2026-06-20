import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit'
import { apiSlice } from '@/api/apiSlice'
import authReducer from '@/features/auth/authSlice'
import toastReducer, { showToast } from '@/features/toast/toastSlice'

const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorMsg = action.payload?.data?.message || action.payload?.message || 'An error occurred'
    api.dispatch(showToast({ message: errorMsg, severity: 'error' }))
  }
  return next(action)
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, rtkQueryErrorLogger),
})
