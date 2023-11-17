import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import { EditImg } from '@/assets/edit-img'
import { PlayCircleImg } from '@/assets/play-circle-img'
import { TrashImg } from '@/assets/trash-img'
import { CreateDeckFormValues, Delete, EditDeck, ModalWrapper } from '@/components'
import { Modal } from '@/components/ui/modal'
import { useMeQuery } from '@/services/auth/auth-api'
import { useDeleteDeckMutation, useUpdateDeckMutation } from '@/services/decks/decks-api'
import { Deck } from '@/services/decks/types'
import clsx from 'clsx'

import s from './edit-buttons.module.scss'

type EditButtonsProps = {
  item: Deck
}
export const EditButtons: FC<EditButtonsProps> = ({ item }) => {
  const [deleteDeck] = useDeleteDeckMutation()

  const [updateDeck] = useUpdateDeckMutation()
  const { data: me } = useMeQuery()

  const isMyDeck = me?.id === item.userId

  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const buttonCN = clsx(!isMyDeck && s.disabled)
  const linkCN = clsx(item.cardsCount === 0 && s.disabled)

  const updateDeckHandler = (data: CreateDeckFormValues) => {
    setIsOpenEdit(false)
    updateDeck({
      cover: data.image,
      id: item.id,
      isPrivate: data.isPrivate,
      name: data.name,
    })
  }

  const deleteHandler = () => {
    if (isMyDeck) {
      deleteDeck({ id: item.id })
    }
  }

  return (
    <div className={s.wrapper}>
      <Link className={linkCN} to={`/learn-deck/${item.id}`}>
        <PlayCircleImg />
      </Link>

      <button className={buttonCN} onClick={() => setIsOpenEdit(isMyDeck)}>
        <EditImg />
      </button>
      <Modal onOpenChange={() => setIsOpenEdit(false)} open={isOpenEdit}>
        <ModalWrapper
          body={
            <EditDeck
              cover={item.cover}
              isPrivate={item.isPrivate}
              name={item.name}
              onSubmit={updateDeckHandler}
              variant={'edit'}
            />
          }
          title={'Edit Deck'}
        />
      </Modal>

      <button className={buttonCN} onClick={() => setIsOpenDelete(isMyDeck)}>
        <TrashImg />
      </button>
      <Modal onOpenChange={() => setIsOpenDelete(false)} open={isOpenDelete}>
        <ModalWrapper
          body={<Delete callback={deleteHandler} title={item.name} variant={'Deck'} />}
          title={'Delete Deck'}
        />
      </Modal>
    </div>
  )
}
