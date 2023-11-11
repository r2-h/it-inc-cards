export type CardsResponse = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  id: string
  question: string
  questionImg: string
  questionVideo: string
  rating: number
  shots: number
  updated: string
  userId: string
}

export type CreateCardArg = {
  answer?: string
  deckId?: string
  question?: string
}

export type UpdateCardArg = {
  answer: string
  answerImg: string
  id: string
  question: string
  questionImg?: string
}

export type GetCardsParams = {
  answer?: string
  currentPage?: number
  id: string
  itemsPerPage?: number
  orderBy?: string
  question?: string
}
