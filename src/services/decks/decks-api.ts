import { baseApi } from '@/services/base-api'
import {
  CreateDeckParams,
  Deck,
  DecksParams,
  DecksResponse,
  GetCardInDeckResponse,
} from '@/services/decks/types'

const decksAPI = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckParams>({
        invalidatesTags: ['Decks'],
        query: body => ({
          body,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      getCardsInDeck: builder.query<GetCardInDeckResponse, { id: string }>({
        providesTags: ['Decks'],
        query: ({ id }) => ({
          url: `v1/decks/${id}/cards`,
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

export const { useCreateDeckMutation, useGetCardsInDeckQuery, useGetDecksQuery } = decksAPI
