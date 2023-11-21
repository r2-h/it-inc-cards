import { FC, useState } from 'react'

import { EditImg } from '@/assets/edit-img'
import { TrashImg } from '@/assets/trash-img'
import { AddCardsFormValues, Delete, EditCard, Modal, ModalWrapper } from '@/components'
import { CardsResponse, useDeleteCardMutation, useUpdateCardMutation } from '@/services'
import clsx from 'clsx'

import s from './edit-cell.module.scss'

type EditCellProps = {
  card: CardsResponse
  disabled?: boolean
  isEditable?: boolean
}

export const EditCell: FC<EditCellProps> = ({ card, disabled, isEditable }) => {
  const [updateCard] = useUpdateCardMutation()
  const [deleteCard] = useDeleteCardMutation()

  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const editCardHandler = (data: AddCardsFormValues) => {
    setIsOpenEdit(false)
    updateCard({
      answer: data.answer,
      answerImg: data?.answerImg,
      answerVideo: data.answerVideo,
      id: card.id,
      question: data.question,
      questionImg: data?.questionImg,
      questionVideo: data.questionVideo,
    })
  }

  const deleteCardHandler = () => {
    deleteCard({ id: card.id })
  }
  const iconCN = clsx(s.icon, disabled && s.disabled)

  return (
    <div className={s.buttons}>
      <button className={s.button} onClick={() => setIsOpenEdit(isEditable ?? true)}>
        <EditImg className={iconCN} />
      </button>
      <Modal onOpenChange={() => setIsOpenEdit(false)} open={isOpenEdit}>
        <ModalWrapper
          body={<EditCard card={card} onSubmit={editCardHandler} variant={'edit'} />}
          title={'Edit Card'}
        />
      </Modal>

      <Modal
        open={isEditable}
        trigger={
          <button className={s.button}>
            <TrashImg className={iconCN} />
          </button>
        }
      >
        <ModalWrapper
          body={<Delete callback={deleteCardHandler} title={card?.question} variant={'Card'} />}
          title={'Delete Card'}
        />
      </Modal>
    </div>
  )
}
