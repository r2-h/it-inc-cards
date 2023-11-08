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
        // onQueryStarted: async (_, { dispatch, getState, queryFulfilled }) => {
        //   const {
        //     decks: { currentPage, itemsPerPage, search, sliderValue, sort, tabsValue },
        //   } = getState() as RootState
        //
        //   try {
        //     const result = await queryFulfilled
        //
        //     dispatch(
        //       decksAPI.util.updateQueryData(
        //         'getDecks',
        //         {
        //           authorId: tabsValue,
        //           currentPage,
        //           itemsPerPage,
        //           maxCardsCount: `${sliderValue[1]}`,
        //           minCardsCount: `${sliderValue[0]}`,
        //           name: search,
        //           orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
        //         },
        //         draft => {
        //           draft?.items?.unshift(result.data)
        //         }
        //       )
        //     )
        //   } catch (e) {
        //     console.log(e)
        //   }
        // },
        query: body => ({
          body,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      deleteDeck: builder.mutation<DeleteResponse, { id: Deck['id'] }>({
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
        async onQueryStarted({ id, isPrivate, name }, { dispatch, getState, queryFulfilled }) {
          const {
            decks: { currentPage, itemsPerPage, search, sliderValue, sort, tabsValue },
          } = getState() as RootState
          const patchResult = dispatch(
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
                }
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        query: ({ id, ...body }) => {
          // const formData = new FormData()
          //
          // patch.name && formData.append('name', patch.name)
          // patch.cover && formData.append('cover', patch.cover)
          // typeof patch.isPrivate === 'boolean' &&
          //   formData.append('isPrivate', patch.isPrivate.toString())

          return {
            body,
            formData: true,
            method: 'PATCH',
            url: `v1/decks/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} = decksAPI
