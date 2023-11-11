import { baseApi } from '@/services/base-api'
import { CardsResponse, CreateCardArg, GetCardsParams, UpdateCardArg } from '@/services/cards/types'
import { Deck, GetCardInDeckResponse } from '@/services/decks/types'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<CardsResponse, CreateCardArg>({
        invalidatesTags: ['Cards'],
        query: ({ deckId, ...body }) => ({
          body,
          method: 'POST',
          url: `v1/decks/${deckId}/cards`,
        }),
      }),
      deleteCard: builder.mutation<void, { id: string }>({
        invalidatesTags: ['Cards'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/cards/${id}`,
        }),
      }),
      getCardsInDeck: builder.query<GetCardInDeckResponse, GetCardsParams>({
        providesTags: ['Cards'],
        query: ({ id, ...params }) => ({
          method: 'GET',
          params: params || {},
          url: `v1/decks/${id}/cards`,
        }),
      }),
      getDeck: builder.query<Deck, { id: string }>({
        providesTags: ['Cards'],
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
        }),
      }),
      updateCard: builder.mutation<CardsResponse, UpdateCardArg>({
        invalidatesTags: ['Cards'],
        query: args => {
          console.log(2, args)
          const { id, ...body } = args
          const formData = new FormData()

          if (body.questionImg) {
            formData.append('questionImg', body.questionImg)
          }
          formData.append('answer', body.answer)
          formData.append('question', body.question)

          return { body: formData, formData, method: 'PATCH', url: `v1/cards/${id}` }
        },
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsInDeckQuery,
  useGetDeckQuery,
  useUpdateCardMutation,
} = cardsApi
