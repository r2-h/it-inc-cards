import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import ava from '../../assets/ava.jpg'

const initialState: AuthStateType = {
  avatar: ava,
}

const slice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload
    },
  },
})

export type AuthStateType = {
  avatar: string
}

export const authReducers = slice.reducer
export const authActions = slice.actions
