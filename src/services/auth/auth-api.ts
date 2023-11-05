import { AuthResponse, LoginParams, SignUpParams } from '@/services/auth/types'
import { baseApi } from '@/services/base-api'

const authAPI = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<void, LoginParams>({
        invalidatesTags: ['Auth'],
        query: body => ({
          body,
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
      signUp: builder.mutation<AuthResponse, SignUpParams>({
        invalidatesTags: ['Auth'],
        query: ({ email, password }) => ({
          body: { email, password },
          method: 'POST',
          url: `v1/auth/sign-up`,
        }),
      }),
    }
  },
})

export const { useLoginMutation, useMeQuery, useSignUpMutation } = authAPI
