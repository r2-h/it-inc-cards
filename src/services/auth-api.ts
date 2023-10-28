import { baseApi } from '@/services/base-api'

const decksAPI = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<any, { email: string; password: string }>({
        query: ({ email, password }) => ({
          body: { email, password },
          method: 'POST',
          url: `v1/auth/login`,
        }),
      }),
      signUp: builder.mutation<any, any>({
        query: params => ({
          body: params,
          method: 'POST',
          url: `v1/auth/sign-up`,
        }),
      }),
    }
  },
})

export const { useLoginMutation, useSignUpMutation } = decksAPI
