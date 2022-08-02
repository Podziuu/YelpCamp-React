import { configureStore } from '@reduxjs/toolkit'
import { campgroundsApi } from '../api'

export const store = configureStore({
  reducer: {
    [campgroundsApi.reducerPath]: campgroundsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(campgroundsApi.middleware),
})