import { ChangeEvent, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import ArrowBackImg from '@/assets/arrow-back-img'
import { EditImg } from '@/assets/edit-img'
import { PlayCircleImg } from '@/assets/play-circle-img'
import { TrashImg } from '@/assets/trash-img'
import { CreateDeckFormValues, Delete, EditDeck, ModalWrapper } from '@/components'
import { Button } from '@/components/ui/button'
import { DropDown, DropDownItem } from '@/components/ui/drop-down'
import { Modal } from '@/components/ui/modal'
import { Pagination } from '@/components/ui/pagination'
import { TextField } from '@/components/ui/text-field'
import { TriggerMore } from '@/components/ui/triggerMore'
import { Typography } from '@/components/ui/typography'
import { AddNewCard } from '@/pages/cards/add-new-card'
import { CardsSort, CardsTable } from '@/pages/cards/cards-table'
import {
  CardsSortQuery,
  useDeleteDeckMutation,
  useGetDeckQuery,
  useUpdateDeckMutation,
} from '@/services'
import { useMeQuery } from '@/services/auth/auth-api'
import { useGetCardsInDeckQuery } from '@/services/cards/cards-api'
import { cardsActions } from '@/services/cards/cards-slice'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './cards.module.scss'

import { EmptyDeck } from './empty-deck'

export const Cards = () => {
  const navigate = useNavigate()
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

  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const { data: me } = useMeQuery()
  const { data: deck } = useGetDeckQuery({ id: id ?? '' })
  const { data: cards, isError } = useGetCardsInDeckQuery({
    currentPage,
    id: id ?? '',
    itemsPerPage,
    orderBy,
    question: searchQuestion,
  })

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const sortHandler = (sort: CardsSort) => dispatch(cardsActions.setSort(sort))
  const currentPageHandler = (page: number) => dispatch(cardsActions.setCurrentPage(page))
  const itemsPerPageHandler = (size: string) => dispatch(cardsActions.setItemsPerPage(+size))
  const searchQuestionHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(cardsActions.setSearchQuestion(e.currentTarget.value))
  const clearSearchHandler = () => dispatch(cardsActions.setSearchQuestion(''))
  const updateDeckHandler = (data: CreateDeckFormValues) => {
    setIsEditModalOpen(false)
    if (deck?.id) {
      updateDeck({ cover: data.image, id: deck.id, isPrivate: data.isPrivate, name: data.name })
    }
  }
  const deleteDeckHandler = () => {
    if (deck?.id) {
      deleteDeck({ id: deck.id })
      navigate('/')
    }
  }

  if (isError) {
    return <Navigate to={'/404'} />
  }

  const myDeck = deck?.userId === me?.id

  return (
    <>
      <Link className={s.linkBack} to={'/'}>
        <ArrowBackImg />
        <Typography className={s.back} variant={'body2'}>
          Back to Decks List
        </Typography>
      </Link>
      <div className={s.header}>
        <div>
          <Typography className={s.title} variant={'large'}>
            {deck?.name}
          </Typography>

          {myDeck && (
            <DropDown trigger={<TriggerMore />}>
              <DropDownItem
                icon={<PlayCircleImg />}
                onSelect={() => {
                  navigate(`/learn-deck/${deck?.id}`)
                }}
                text={'Learn'}
              />
              <DropDownItem
                icon={<EditImg />}
                onSelect={() => setIsEditModalOpen(true)}
                text={'Edit'}
              />
              <DropDownItem
                icon={<TrashImg />}
                lastItem
                onSelect={() => setIsDeleteModalOpen(true)}
                text={'Delete'}
              />
            </DropDown>
          )}
        </div>

        {myDeck && !!deck?.cardsCount && <AddNewCard />}
        {!myDeck && (
          <Button as={'a'} href={`/learn-deck/${id}`} variant={'primary'}>
            Learn the Deck
          </Button>
        )}
      </div>

      {deck?.cover && (
        <div className={s.deckImage} style={{ backgroundImage: `url(${deck.cover})` }}></div>
      )}

      {myDeck && !deck?.cardsCount && <EmptyDeck />}

      {myDeck && !!deck?.cardsCount && (
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

      {!myDeck && (
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

      {isEditModalOpen && (
        <Modal onOpenChange={() => setIsEditModalOpen(false)} open={isEditModalOpen}>
          <ModalWrapper
            body={
              <EditDeck
                cover={deck?.cover}
                isPrivate={deck?.isPrivate}
                name={deck?.name}
                onSubmit={updateDeckHandler}
                variant={'edit'}
              />
            }
            title={'Edit Deck'}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal onOpenChange={() => setIsDeleteModalOpen(false)} open={isDeleteModalOpen}>
          <ModalWrapper
            body={<Delete callback={deleteDeckHandler} title={deck!.name} variant={'Deck'} />}
            title={'Delete Deck'}
          />
        </Modal>
      )}
    </>
  )
}
