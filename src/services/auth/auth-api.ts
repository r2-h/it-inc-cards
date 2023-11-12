import {
  AuthResponse,
  LoginParams,
  RecoverPasswordParams,
  ResetPasswordParams,
  SignUpParams,
  UpdateUserParams,
} from '@/services/auth/types'
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
      logout: builder.mutation<void, void>({
        invalidatesTags: ['Auth'],
        async onQueryStarted(_, { dispatch }) {
          dispatch(authAPI.util.resetApiState())
        },
        query: () => ({
          method: 'POST',
          url: `v1/auth/logout`,
        }),
      }),
      me: builder.query<AuthResponse, void>({
        providesTags: ['Auth'],
        query: () => ({
          method: 'GET',
          url: `v1/auth/me`,
        }),
      }),
      recoverPassword: builder.mutation<void, RecoverPasswordParams>({
        invalidatesTags: ['Auth'],
        query: ({ email, html }) => ({
          body: { email, html },
          method: 'POST',
          url: `v1/auth/recover-password`,
        }),
      }),
      resetPassword: builder.mutation<void, ResetPasswordParams>({
        invalidatesTags: ['Auth'],
        query: ({ password, token }) => ({
          body: { password },
          method: 'POST',
          url: `v1/auth/reset-password/${token}`,
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
  useLogoutMutation,
  useMeQuery,
  useRecoverPasswordMutation,
  useResetPasswordMutation,
  useSignUpMutation,
  useUpdateUserMutation,
} = authAPI
