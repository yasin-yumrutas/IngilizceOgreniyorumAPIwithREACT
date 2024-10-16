import { configureStore } from '@reduxjs/toolkit'
import userAnswer from './userAnswer'

export default configureStore({
  reducer: {
    userAnswerInfo : userAnswer
  },
})