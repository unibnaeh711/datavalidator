import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../Slices/authSlice';
import fileReducer from '../Slices/fileSlice'

const rootReducer = {
  auth: authReducer,
  file: fileReducer,
}
export type RootState = ReturnType<any>

export const store = configureStore({
  reducer: rootReducer,
})
