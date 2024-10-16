import { createSlice } from '@reduxjs/toolkit'

export const userAnswerSend = createSlice({
  name: 'userAnswer',
  initialState: {
    value: [],
  },
  reducers: {
    sendAnswer: (state , info) => {
      state.value = info.payload
    }
  },
})

export const { sendAnswer } = userAnswerSend.actions
export default userAnswerSend.reducer