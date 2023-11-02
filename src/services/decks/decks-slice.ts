import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: DecksStateType = {
  currentPage: 1,
  itemsPerPage: 10,
  search: '',
  sliderValue: [0, 10],
  tabsValue: '',
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
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
      state.currentPage = 1
    },
    setSliderValue: (state, action: PayloadAction<[number, number]>) => {
      state.sliderValue = action.payload
    },
    setTabsValue: (state, action: PayloadAction<string>) => {
      state.tabsValue = action.payload
    },
  },
})

type DecksStateType = {
  currentPage: number
  itemsPerPage: number
  search: string
  sliderValue: [number, number]
  tabsValue: string
}

export const decksReducers = slice.reducer
export const decksActions = slice.actions
