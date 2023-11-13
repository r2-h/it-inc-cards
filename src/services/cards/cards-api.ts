import { baseApi } from '@/services/base-api'
import { CardsResponse, CreateCardArg, GetCardsParams, UpdateCardArg } from '@/services/cards/types'
import { Deck, GetCardInDeckResponse, UpdateDeckParams } from '@/services/decks/types'

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
      getDeck: builder.query<Deck, { id: string }>({
        providesTags: ['Decks'],
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
        }),
      }),
      learnCards: builder.query<CardsResponse, { id: string }>({
        query: ({ id }) => ({
          method: 'GET',
          url: `v1/decks/${id}/learn`,
        }),
      }),
      patchDeck: builder.mutation<Deck, UpdateDeckParams>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ cover, id, isPrivate, name }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            cardsApi.util.updateQueryData('getDeck', { id: id! }, draft => {
              if (draft) {
                if (name) {
                  draft.name = name
                }
                if (typeof isPrivate === 'boolean') {
                  draft.isPrivate = isPrivate
                }
                if (cover) {
                  draft.cover = URL.createObjectURL(cover as Blob)
                }
              }
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        query: patch => {
          const formData = new FormData()

          patch.name && formData.append('name', patch.name)
          patch.cover && formData.append('cover', patch.cover)
          typeof patch.isPrivate === 'boolean' && formData.append('isPrivate', `${patch.isPrivate}`)

          return {
            body: formData,
            formData: true,
            method: 'PATCH',
            url: `v1/decks/${patch.id}`,
          }
        },
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
  useGetDeckQuery,
  useLearnCardsQuery,
  usePatchDeckMutation,
  useUpdateCardMutation,
} = cardsApi
