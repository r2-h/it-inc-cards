import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: AuthStateType = {
  avatar: '',
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
