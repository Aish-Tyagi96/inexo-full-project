import { createSlice } from '@reduxjs/toolkit'

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    submissions: [],
  },
  reducers: {
    addSubmission: (state, action) => {
      state.submissions.push(action.payload)
    },
  },
})

export const { addSubmission } = contactSlice.actions
export default contactSlice.reducer
