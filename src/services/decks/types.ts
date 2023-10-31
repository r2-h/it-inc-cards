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
  cover?: null | string
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

export type CreateDeckParams = Pick<Deck, 'cover' | 'isPrivate' | 'name'>

export type DecksResponse = {
  items: Array<Deck>
  maxCardsCount: number
  pagination: Pagination
}

type Field = 'name' | 'updated'
type Direction = 'asc' | 'desc'
export type DecksParams = {
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: string
  minCardsCount?: string
  name?: string
  orderBy?: `${Field}-${Direction}`
} | void
