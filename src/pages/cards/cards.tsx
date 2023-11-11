import { ChangeEvent, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import ArrowBackImg from '@/assets/arrow-back-img'
import { EditImg } from '@/assets/edit-img'
import { PlayCircleImg } from '@/assets/play-circle-img'
import { TrashImg } from '@/assets/trash-img'
import {
  AddCardsFormValues,
  CreateDeckFormValues,
  EditCard,
  EditDeck,
  ModalWrapper,
} from '@/components'
import { Button } from '@/components/ui/button'
import { DropDown, DropDownItem } from '@/components/ui/drop-down'
import { Modal } from '@/components/ui/modal'
import { Pagination } from '@/components/ui/pagination'
import { TextField } from '@/components/ui/text-field'
import { TriggerMore } from '@/components/ui/triggerMore'
import { Typography } from '@/components/ui/typography'
import { CardsTable } from '@/pages/cards/cards-table'
import { useUpdateDeckMutation } from '@/services'
import { useMeQuery } from '@/services/auth/auth-api'
import {
  useCreateCardMutation,
  useGetCardsInDeckQuery,
  useGetDeckQuery,
} from '@/services/cards/cards-api'
import { cardsActions } from '@/services/cards/cards-slice'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './cards.module.scss'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()

  const searchQuestion = useAppSelector(state => state.cards.searchQuestion)
  const currentPage = useAppSelector(state => state.cards.currentPage)
  const itemsPerPage = useAppSelector(state => state.cards.itemsPerPage)
  const [updateDeck] = useUpdateDeckMutation()

  const [createCard] = useCreateCardMutation()
  const { data: me } = useMeQuery()
  const { data: deck } = useGetDeckQuery({ id: id ?? '' })
  const { data: cards, isError } = useGetCardsInDeckQuery({
    currentPage,
    id: id ?? '',
    itemsPerPage,
    question: searchQuestion,
  })

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const currentPageHandler = (page: number) => dispatch(cardsActions.setCurrentPage(page))
  const itemsPerPageHandler = (size: string) => dispatch(cardsActions.setItemsPerPage(+size))
  const searchQuestionHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(cardsActions.setSearchQuestion(e.currentTarget.value))
  const clearSearchHandler = () => dispatch(cardsActions.setSearchQuestion(''))
  const addCardHandler = (data: AddCardsFormValues) => {
    if (id) {
      setIsCreateModalOpen(false)
      createCard({
        answer: data.answer,
        answerImg: data?.answerImg,
        id,
        question: data.question,
        questionImg: data?.questionImg,
      })
    }
  }

  const updateDeckHandler = (data: CreateDeckFormValues) => {
    if (deck?.id) {
      updateDeck({ cover: data.image, id: deck.id, isPrivate: data.isPrivate, name: data.name })
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
              <DropDownItem icon={<PlayCircleImg />} text={'Learn'} />
              <DropDownItem
                icon={<EditImg />}
                onSelect={() => setIsEditModalOpen(true)}
                text={'Edit'}
              />
              <DropDownItem icon={<TrashImg />} lastItem text={'Delete'} />
            </DropDown>
          )}
        </div>

        {myDeck && (
          <>
            <Button onClick={() => setIsCreateModalOpen(true)} variant={'primary'}>
              Add New Card
            </Button>
            <Modal onOpenChange={() => setIsCreateModalOpen(false)} open={isCreateModalOpen}>
              <ModalWrapper
                body={<EditCard onSubmit={addCardHandler} variant={'add'} />}
                title={'Add New Card'}
              />
            </Modal>
          </>
        )}
        {!myDeck && <Button variant={'primary'}>Learn to Deck</Button>}
      </div>

      {deck?.cover && (
        <div className={s.deckImage} style={{ backgroundImage: `url(${deck.cover})` }}></div>
      )}

      <TextField
        className={s.input}
        fullWidth
        onChange={searchQuestionHandler}
        onClearClick={clearSearchHandler}
        placeholder={'Input search'}
        type={'search'}
        value={searchQuestion}
      />

      <CardsTable data={cards?.items} myDeck={myDeck} />

      {cards?.pagination.totalItems !== 0 && (
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
    </>
  )
}
