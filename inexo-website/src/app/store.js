import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '@/features/app/uiSlice'
import contactReducer from '@/features/contact/contactSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    contact: contactReducer,
  },
})
