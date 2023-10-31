import { AuthResponse, LoginParams } from '@/services/auth/types'
import { baseApi } from '@/services/base-api'

const decksAPI = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<void, LoginParams>({
        invalidatesTags: ['Decks'],
        query: params => ({
          body: params,
          method: 'POST',
          url: `v1/auth/login`,
        }),
      }),
      me: builder.query<AuthResponse, void>({
        providesTags: ['Auth'],
        query: () => ({
          method: 'GET',
          url: `v1/auth/me`,
        }),
      }),
      signUp: builder.mutation<AuthResponse, void>({
        invalidatesTags: ['Decks'],
        query: params => ({
          body: params,
          method: 'POST',
          url: `v1/auth/sign-up`,
        }),
      }),
    }
  },
})

export const { useLoginMutation, useMeQuery, useSignUpMutation } = decksAPI
