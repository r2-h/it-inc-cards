import { AuthResponse, LoginParams, SignUpParams, UpdateUserParams } from '@/services/auth/types'
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
      signOut: builder.mutation<void, void>({
        invalidatesTags: ['Auth'],
        query: body => ({
          body,
          method: 'POST',
          url: `v1/auth/logout`,
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
      updateUser: builder.mutation<AuthResponse, UpdateUserParams>({
        invalidatesTags: ['Auth'],
        query: body => ({
          body,
          method: 'PATCH',
          url: `v1/auth/me`,
        }),
      }),
    }
  },
})

export const {
  useLoginMutation,
  useMeQuery,
  useSignOutMutation,
  useSignUpMutation,
  useUpdateUserMutation,
} = authAPI
