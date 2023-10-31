import { baseApi } from '@/services/base-api'
import { CardsResponse } from '@/services/cards/types'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteCard: builder.mutation<void, { id: string }>({
        invalidatesTags: ['Cards'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/cards/${id}`,
        }),
      }),
      getCard: builder.query<CardsResponse, { id: string }>({
        providesTags: ['Cards'],
        query: ({ id }) => ({
          method: 'GET',
          url: `v1/cards/${id}`,
        }),
      }),
      updateCard: builder.mutation<CardsResponse, { id: string }>({
        invalidatesTags: ['Cards'],
        query: ({ id }) => ({
          method: 'PATCH',
          url: `v1/cards/${id}`,
        }),
      }),
    }
  },
})

export const { useDeleteCardMutation, useGetCardQuery, useUpdateCardMutation } = cardsApi
