import { Sort } from '@/pages/decks'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: DecksStateType = {
  currentPage: 1,
  image: undefined,
  itemsPerPage: 10,
  search: '',
  sliderValue: [0, 61],
  sort: null,
  tabsValue: '',
}

const slice = createSlice({
  initialState,
  name: 'decksSlice',
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setImage: (state, action: PayloadAction<Blob | undefined>) => {
      state.image = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
      state.currentPage = 1
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
      state.currentPage = 1
    },
    setSliderValue: (state, action: PayloadAction<[number, number]>) => {
      state.sliderValue = action.payload
    },

    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload
    },
    setTabsValue: (state, action: PayloadAction<string>) => {
      state.tabsValue = action.payload
    },
  },
})

type DecksStateType = {
  currentPage: number
  image: Blob | undefined
  itemsPerPage: number
  search: string
  sliderValue: [number, number]
  sort: Sort
  tabsValue: string
}

export const decksReducers = slice.reducer
export const decksActions = slice.actions
