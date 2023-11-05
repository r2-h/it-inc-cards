import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authReducers } from '@/services/auth'
import { cardsReducers } from '@/services/cards'
import { decksReducers } from '@/services/decks/decks-slice'
import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from './base-api'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: {
    auth: authReducers,
    [baseApi.reducerPath]: baseApi.reducer,
    cards: cardsReducers,
    decks: decksReducers,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
