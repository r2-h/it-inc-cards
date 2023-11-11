import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import ava from '../../assets/ava.jpg'

const initialState: AuthStateType = {
  avatar: ava,
  error: undefined,
}

const slice = createSlice({
  extraReducers: builder => {
    builder
      .addMatcher(
        action => action.type.endsWith('executeMutation/rejected'),
        (state, action) => {
          state.error = action.payload.error
        }
      )
      .addMatcher(
        action => {
          return !!(
            action.type.endsWith('/fulfilled') || action.type.endsWith('/removeMutationResult')
          )
        },
        state => {
          state.error = undefined
        }
      )
  },
  initialState,
  name: 'authSlice',
  reducers: {
    setAvatar: (state, action: PayloadAction<string | undefined>) => {
      state.avatar = action.payload
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload
    },
  },
})

export type AuthStateType = {
  avatar: string | undefined
  error: string | undefined
}

export const authReducers = slice.reducer
export const authActions = slice.actions
