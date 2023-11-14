import { CardsColumnField } from '@/pages'
import { Direction } from '@/services'

export type CardsResponse = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type CreateCardArg = {
  answer: string
  answerImg?: string
  answerVideo?: string
  id: string
  question: string
  questionImg?: string
  questionVideo?: string
}

export type UpdateCardArg = {
  answer: string
  answerImg?: string
  answerVideo?: string
  id: string
  question: string
  questionImg?: string
  questionVideo?: string
}

export type GetCardsParams = {
  answer?: string
  currentPage?: number
  id: string
  itemsPerPage?: number
  orderBy?: CardsSortQuery
  question?: string
}
export type CardsSortQuery = `${CardsColumnField}-${Direction}`

export type SaveGradeArgs = { cardId: string; grade: number; id: string }
