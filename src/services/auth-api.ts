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
    }
  },
})

export const { useLoginMutation } = decksAPI
