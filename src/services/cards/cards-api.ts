import { baseApi } from '@/services/base-api'
import {
  CardsResponse,
  CreateCardArg,
  GetCardsParams,
  SaveGradeArgs,
  UpdateCardArg,
} from '@/services/cards/types'
import { GetCardInDeckResponse } from '@/services/decks/types'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<CardsResponse, CreateCardArg>({
        invalidatesTags: ['Cards', 'Decks'],
        query: args => {
          const { id, ...body } = args
          const formData = new FormData()

          if (body.questionVideo) {
            formData.append('questionVideo', body.questionVideo)
          }
          if (body.answerVideo) {
            formData.append('answerVideo', body.answerVideo)
          }
          if (body.questionImg) {
            formData.append('questionImg', body.questionImg)
          }
          if (body.answerImg) {
            formData.append('answerImg', body.answerImg)
          }
          formData.append('answer', body.answer)
          formData.append('question', body.question)

          return {
            body: formData,
            formData,
            method: 'POST',
            url: `v1/decks/${id}/cards`,
          }
        },
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
      learnCards: builder.query<CardsResponse, { id: string }>({
        providesTags: ['Cards'],
        query: ({ id }) => ({
          method: 'GET',
          url: `v1/decks/${id}/learn`,
        }),
      }),
      saveGrade: builder.mutation<void, SaveGradeArgs>({
        invalidatesTags: ['Cards'],
        query: ({ id, ...body }) => ({
          body,
          method: 'POST',
          url: `v1/decks/${id}/learn`,
        }),
      }),
      updateCard: builder.mutation<CardsResponse, UpdateCardArg>({
        invalidatesTags: ['Cards', 'Decks'],
        query: args => {
          const { id, ...body } = args
          const formData = new FormData()

          if (body.questionVideo) {
            formData.append('questionVideo', body.questionVideo)
          }
          if (body.answerVideo) {
            formData.append('answerVideo', body.answerVideo)
          }
          if (body.questionImg) {
            formData.append('questionImg', body.questionImg)
          }
          if (body.answerImg) {
            formData.append('answerImg', body.answerImg)
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
  useLearnCardsQuery,
  useSaveGradeMutation,
  useUpdateCardMutation,
} = cardsApi
