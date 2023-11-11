import { CardsResponse } from '@/services/cards/types'

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type Author = {
  id: string
  name: string
}

export type Deck = {
  author: Author
  cardsCount: number
  cover?: Blob | string | undefined
  created: string
  id: string
  isBlocked: boolean | null
  isDeleted: boolean | null
  isPrivate?: boolean
  name: string
  rating: number
  shots: number
  updated: string
  userId: string
}
export type DeleteResponse = {
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  rating: number
  shots: number
  updated: string
  userId: string
}

export type CreateDeckParams = Partial<Pick<Deck, 'cover' | 'isPrivate' | 'name'>>
export type UpdateDeckParams = Partial<CreateDeckParams & Pick<Deck, 'id'>>
export type DecksResponse = {
  items: Array<Deck>
  maxCardsCount: number
  pagination: Pagination
}

export type Field = 'cardsCount' | 'createdBy' | 'name' | 'updated'
export type Direction = 'asc' | 'desc'
export type DecksParams = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: string
  minCardsCount?: string
  name?: string
  orderBy?: `${Field}-${Direction}` | undefined
} | void

export type GetCardInDeckResponse = {
  items: CardsResponse[]
  pagination: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
}
