import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: CardsStateType = {
  search: '',
}

const slice = createSlice({
  initialState,
  name: 'decksSlice',
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

type CardsStateType = {
  search: string
}

export const cardsReducers = slice.reducer
export const cardsActions = slice.actions
