import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: CardsStateType = {
  currentPage: 1,
  itemsPerPage: 10,
  searchQuestion: '',
}

const slice = createSlice({
  initialState,
  name: 'decksSlice',
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
  },
})

type CardsStateType = {
  currentPage: number
  itemsPerPage: number
  searchQuestion: string
}

export const cardsReducers = slice.reducer
export const cardsActions = slice.actions
