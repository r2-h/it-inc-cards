import { baseApi } from '@/services/base-api'
import {
  CreateDeckParams,
  Deck,
  DecksParams,
  DecksResponse,
  DeleteResponse,
  UpdateDeckParams,
} from '@/services/decks/types'
import { RootState } from '@/services/store'

const decksAPI = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckParams>({
        invalidatesTags: ['Decks'],
        onQueryStarted: async (_, { dispatch, getState, queryFulfilled }) => {
          const {
            decks: { currentPage, itemsPerPage, search, sliderValue, sort, tabsValue },
          } = getState() as RootState

          try {
            const result = await queryFulfilled

            dispatch(
              decksAPI.util.updateQueryData(
                'getDecks',
                {
                  authorId: tabsValue,
                  currentPage,
                  itemsPerPage,
                  maxCardsCount: `${sliderValue[1]}`,
                  minCardsCount: `${sliderValue[0]}`,
                  name: search,
                  orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
                },
                draft => {
                  draft?.items?.unshift(result.data)
                }
              )
            )
          } catch (e) {
            console.log(e)
          }
        },

        query: body => {
          const formData = new FormData()

          if (body.cover) {
            formData.append('cover', body.cover)
          }
          formData.append('name', `${body.name}`)
          formData.append('isPrivate', `${body.isPrivate}`)

          return { body: formData, formData, method: 'POST', url: `v1/decks` }
        },
      }),
      deleteDeck: builder.mutation<DeleteResponse, { id: string }>({
        invalidatesTags: ['Decks'],
        onQueryStarted: async ({ id }, { dispatch, getState, queryFulfilled }) => {
          const {
            decks: { currentPage, itemsPerPage, search, sliderValue, sort, tabsValue },
          } = getState() as RootState
          const patchResult = dispatch(
            decksAPI.util.updateQueryData(
              'getDecks',
              {
                authorId: tabsValue,
                currentPage,
                itemsPerPage,
                maxCardsCount: `${sliderValue[1]}`,
                minCardsCount: `${sliderValue[0]}`,
                name: search,
                orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
              },
              draft => {
                draft?.items?.splice(draft?.items?.findIndex(deck => deck.id === id), 1)
              }
            )
          )

          try {
            await queryFulfilled
          } catch (e) {
            patchResult.undo()
          }
        },
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),
      getDeck: builder.query<Deck, { id: string }>({
        providesTags: ['Decks'],
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
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
      updateDeck: builder.mutation<Deck, UpdateDeckParams>({
        invalidatesTags: ['Decks'],
        async onQueryStarted(
          { cover, id, isPrivate, name },
          { dispatch, getState, queryFulfilled }
        ) {
          const {
            decks: { currentPage, itemsPerPage, search, sliderValue, sort, tabsValue },
          } = getState() as RootState

          /* update Decks*/
          const decksResult = dispatch(
            decksAPI.util.updateQueryData(
              'getDecks',
              {
                authorId: tabsValue,
                currentPage: currentPage,
                itemsPerPage: itemsPerPage,
                maxCardsCount: `${sliderValue[1]}`,
                minCardsCount: `${sliderValue[0]}`,
                name: search,
                orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
              },
              draft => {
                const deck = draft.items.find(d => d.id === id)

                if (deck) {
                  if (name) {
                    deck.name = name
                  }
                  if (typeof isPrivate === 'boolean') {
                    deck.isPrivate = isPrivate
                  }
                  if (cover) {
                    deck.cover = URL.createObjectURL(cover as Blob)
                  }
                }
              }
            )
          )

          // /* update deck*/
          const deckResult = dispatch(
            decksAPI.util.updateQueryData('getDeck', { id: id! }, draft => {
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
            decksResult.undo()
            deckResult.undo()
          }
        },

        query: data => {
          const formData = new FormData()

          if (data.cover) {
            formData.append('cover', data.cover)
          }
          formData.append('name', `${data.name}`)
          formData.append('isPrivate', `${data.isPrivate}`)

          return {
            body: formData,
            formData,
            method: 'PATCH',
            url: `v1/decks/${data.id}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckQuery,
  useGetDecksQuery,
  useUpdateDeckMutation,
} = decksAPI

// createDeck optimistic update
//invalidatesTags: [{ id: 'LIST', type: 'Decks' }],
//         onQueryStarted: async (_, { dispatch, getState, queryFulfilled }) => {
//           const {
//             decks: { currentPage, itemsPerPage, search, sliderValue, sort, tabsValue },
//           } = getState() as RootState
//
//           try {
//             const result = await queryFulfilled
//
//             dispatch(
//               decksAPI.util.updateQueryData(
//                 'getDecks',
//                 {
//                   authorId: tabsValue,
//                   currentPage,
//                   itemsPerPage,
//                   maxCardsCount: `${sliderValue[1]}`,
//                   minCardsCount: `${sliderValue[0]}`,
//                   name: search,
//                   orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
//                 },
//                 draft => {
//                   draft?.items?.unshift(result.data)
//                 }
//               )
//             )
//
//             dispatch(decksAPI.util.upsertQueryData('getDeck', { id: result.data.id }, result.data))
//           } catch (e) {
//             console.log(e)
//           }
//         },

//       getDecks: builder.query<DecksResponse, DecksParams>({
//         providesTags: (result, _error, _arg) =>
//           result
//             ? [
//                 { id: 'LIST', type: 'Decks' },
//                 ...result.items.map(({ id }) => ({ id, type: 'Decks' as const })),
//               ]
//             : [{ id: 'LIST', type: 'Decks' }],
//         query: params => ({
//           method: 'GET',
//           params: params || {},
//           url: 'v1/decks',
//         }),
//       }),
