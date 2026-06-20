import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit'
import { apiSlice } from '@/api/apiSlice'
import authReducer from '@/features/auth/authSlice'
import toastReducer, { showToast } from '@/features/toast/toastSlice'

const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (action && action.type) {
    console.log('Redux Middleware Action:', action.type, action)
  }
  if (isRejectedWithValue(action) || (action.type && action.type.endsWith('/rejected'))) {
    console.log('Action matches rejection criteria!', action)
    const errorMsg =
      (action.payload && typeof action.payload.data === 'string' ? action.payload.data : null) ||
      action.payload?.data?.message ||
      action.payload?.message ||
      action.error?.message ||
      'An error occurred'
    console.log('Extracted error message:', errorMsg)
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
