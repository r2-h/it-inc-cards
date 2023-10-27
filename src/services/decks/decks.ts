import { baseApi } from '@/services/base-api'
import { Deck, DecksParams, DecksResponse } from '@/services/decks/types'

const decksAPI = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, { name: string }>({
        invalidatesTags: ['Decks'],
        query: ({ name }) => ({
          body: { name },
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      getDecks: builder.query<DecksResponse, DecksParams>({
        providesTags: ['Decks'],
        query: params => ({
          method: 'GET',
          params: params || {},
          url: `v1/decks`,
        }),
      }),
    }
  },
})

export const { useCreateDeckMutation, useGetDecksQuery } = decksAPI
