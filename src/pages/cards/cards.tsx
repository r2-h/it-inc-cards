import { ChangeEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import ArrowBackImg from '@/assets/arrow-back-img'
import { Button, Pagination, TextField, Typography } from '@/components'
import { AddNewCard, CardsSort, CardsTable, DropDownForCards } from '@/pages'
import {
  CardsSortQuery,
  cardsActions,
  useAppDispatch,
  useAppSelector,
  useGetCardsInDeckQuery,
  useGetDeckQuery,
  useMeQuery,
} from '@/services'
import { clsx } from 'clsx'

import s from './cards.module.scss'

import { EmptyDeck } from './empty-deck'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{
    id: string
  }>()

  const searchQuestion = useAppSelector(state => state.cards.searchQuestion)
  const currentPage = useAppSelector(state => state.cards.currentPage)
  const itemsPerPage = useAppSelector(state => state.cards.itemsPerPage)
  const sort = useAppSelector(state => state.cards.sort)
  let orderBy: CardsSortQuery

  if (sort) {
    orderBy = `${sort.key}-${sort.direction}`
  } else {
    orderBy = 'updated-asc'
  }

  const { data: me } = useMeQuery()
  const { data: deck } = useGetDeckQuery({ id: id ?? '' })
  const { data: cards, isError } = useGetCardsInDeckQuery({
    currentPage,
    id: id ?? '',
    itemsPerPage,
    orderBy,
    question: searchQuestion,
  })

  const sortHandler = (sort: CardsSort) => dispatch(cardsActions.setSort(sort))
  const currentPageHandler = (page: number) => dispatch(cardsActions.setCurrentPage(page))
  const itemsPerPageHandler = (size: string) => dispatch(cardsActions.setItemsPerPage(+size))
  const searchQuestionHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(cardsActions.setSearchQuestion(e.currentTarget.value))
  const clearSearchHandler = () => dispatch(cardsActions.setSearchQuestion(''))

  const buttonCN = clsx(deck?.cardsCount === 0 && s.disabled)

  if (isError) {
    return <Navigate to={'/404'} />
  }

  const myDeck = deck?.userId === me?.id

  const isShowTable = !!deck?.cardsCount || !myDeck

  return (
    <>
      <Link className={s.linkBack} to={'/'}>
        <ArrowBackImg />
        <Typography variant={'body2'}>Back to Decks List</Typography>
      </Link>
      <div className={s.header}>
        <div>
          <Typography className={s.title} variant={'large'}>
            {deck?.name}
          </Typography>

          {myDeck && <DropDownForCards deck={deck} />}
        </div>

        {myDeck && !!deck?.cardsCount && <AddNewCard />}
        {!myDeck && (
          <Button as={'a'} className={buttonCN} href={`/learn-deck/${id}`} variant={'primary'}>
            Learn the Deck
          </Button>
        )}
      </div>

      {deck?.cover && (
        <div className={s.deckImage} style={{ backgroundImage: `url(${deck.cover})` }}></div>
      )}

      {!isShowTable && <EmptyDeck />}

      {isShowTable && (
        <>
          <TextField
            className={s.input}
            disabled={!cards?.pagination.totalItems}
            fullWidth
            onChange={searchQuestionHandler}
            onClearClick={clearSearchHandler}
            placeholder={'Input search'}
            type={'search'}
            value={searchQuestion}
          />

          <CardsTable data={cards?.items} myDeck={myDeck} onSort={sortHandler} sort={sort} />
        </>
      )}

      {!!cards?.pagination.totalItems && (
        <Pagination
          className={s.pagination}
          currentPage={currentPage}
          onChangePage={currentPageHandler}
          onChangePageSize={itemsPerPageHandler}
          pageSize={itemsPerPage}
          totalCount={cards?.pagination.totalItems || 61}
        />
      )}
    </>
  )
}
