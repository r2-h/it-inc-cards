import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: initialStateType = {
  sliderValue: [0, 10],
}

const slice = createSlice({
  initialState,
  name: 'decksSlice',
  reducers: {
    setSliderValue: (state, action: PayloadAction<[number, number]>) => {
      state.sliderValue = action.payload
    },
  },
})

type initialStateType = {
  sliderValue: [number, number]
}

export const decksReducers = slice.reducer
export const { setSliderValue } = slice.actions
