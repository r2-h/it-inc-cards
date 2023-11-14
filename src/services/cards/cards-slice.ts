import { CardsSort } from '@/pages'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: CardsStateType = {
  currentPage: 1,
  itemsPerPage: 10,
  searchQuestion: '',
  sort: null,
}

const slice = createSlice({
  initialState,
  name: 'cardsSlice',
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
      state.currentPage = 1
    },
    setSearchQuestion: (state, action: PayloadAction<string>) => {
      state.searchQuestion = action.payload
      state.currentPage = 1
    },
    setSort: (state, action: PayloadAction<CardsSort>) => {
      state.sort = action.payload
    },
  },
})

type CardsStateType = {
  currentPage: number
  itemsPerPage: number
  searchQuestion: string
  sort: CardsSort
}

export const cardsReducers = slice.reducer
export const cardsActions = slice.actions
